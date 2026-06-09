import { useEffect, useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import {
  MessageCircle, ArrowRight, ChevronRight, X,
  CircleDot, Disc3, Truck, Car, Bike, Factory, Mountain, Leaf,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CategoryIcon } from '../components/CategoryIcons'
import {
  CATALOG_ITEMS,
  searchCatalog,
  getCategoryNode,
  getCatalogByCategory,
  getCatalogBySubcategory,
} from '../data/publicCatalog'
import type { SubcategoryCard } from '../data/publicCatalog'
import { WHATSAPP_NUMBER, WHATSAPP_MSG_CTA } from '../config'

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG_CTA}`

// categoria param → JSON file (used when categoria IS the subcategory name, e.g. llantas)
const CATALOG_BY_CATEGORIA: Record<string, string> = {
  'Llanta auto':        '/catalog/llanta-auto.json',
  'Llanta camión':      '/catalog/llanta-camion.json',
  'Llanta agrícola':    '/catalog/llanta-agricola.json',
  'Llanta moto':        '/catalog/llanta-moto.json',
  'Llanta industrial':  '/catalog/llanta-industrial.json',
  'Llanta cuatri-moto': '/catalog/llanta-cuatrimoto.json',
}

// parent category + sub slug → JSON file (used in hasSubFilter path)
const CATALOG_BY_SUBCAT: Record<string, Record<string, string>> = {
  'Filtros': {
    'aceite':          '/catalog/filtro-aceite.json',
    'aire':            '/catalog/filtro-aire.json',
    'gasolina-diesel': '/catalog/filtro-gasolina.json',
  },
  'Suspensión': {
    'amortiguadores':  '/catalog/amortiguadores.json',
    'direccion':       '/catalog/suspension.json',
    'bujes-horquillas':'/catalog/suspension.json',
  },
  'Clutch': {
    'kits-completos':  '/catalog/clutch.json',
    'collarines':      '/catalog/clutch.json',
    'horquillas':      '/catalog/clutch.json',
  },
  'Baleros': {
    'baleros-rueda':   '/catalog/baleros.json',
    'chumaceras':      '/catalog/baleros.json',
    'conjuntos-juegos':'/catalog/baleros.json',
  },
  'Bandas': {
    'distribucion':    '/catalog/bandas.json',
    'serpentin':       '/catalog/bandas.json',
    'kits-completos':  '/catalog/bandas.json',
  },
  'Baterías': {
    'baterias-auto':   '/catalog/baterias-auto.json',
    'baterias-moto':   '/catalog/baterias-moto.json',
  },
  'Aceites': {
    'motor':                 '/catalog/aceites.json',
    'transmision-hidraulico':'/catalog/aceites.json',
    'motos':                 '/catalog/aceites.json',
    'aditivos-mantenimiento':'/catalog/aceites.json',
  },
}

// Keep backward-compat alias for standard view usage
const CATALOG_FILE = CATALOG_BY_CATEGORIA

interface DbProduct { sku: string; name: string; marca: string; imagen_url: string | null }

function parseDbTireSize(name: string) {
  const m = name.match(/^(\d{3})\s+(\d{2})\s+(\d{2})\b/)
  return m ? { ancho: m[1], alto: m[2], rin: m[3] } : null
}

// ── Category accent colors ────────────────────────────────────────────────────
// Each entry: [glowRgba (for radial glow), chipHex (for label dot + chips)]
const CATEGORY_ACCENTS: Record<string, [string, string]> = {
  'Llantas':          ['rgba(59,130,246,0.22)',   '#3b82f6'],
  'Frenos':           ['rgba(220,38,38,0.22)',     '#dc2626'],
  'Filtros':          ['rgba(14,165,233,0.20)',    '#0ea5e9'],
  'Suspensión':       ['rgba(249,115,22,0.20)',    '#f97316'],
  'Clutch':           ['rgba(220,38,38,0.18)',     '#dc2626'],
  'Baleros':          ['rgba(99,102,241,0.20)',    '#6366f1'],
  'Bandas':           ['rgba(20,184,166,0.20)',    '#14b8a6'],
  'Baterías':         ['rgba(16,185,129,0.20)',    '#10b981'],
  'Aceites':          ['rgba(245,158,11,0.22)',    '#f59e0b'],
  'Herramientas':     ['rgba(148,163,184,0.18)',   '#94a3b8'],
  'Servicio pesado':  ['rgba(100,116,139,0.20)',   '#64748b'],
  'Kits de afinación':['rgba(139,92,246,0.20)',   '#8b5cf6'],
}
const DEFAULT_ACCENT: [string, string] = ['rgba(225,37,27,0.18)', '#e1251b']

function getCategoryAccent(name: string): [string, string] {
  return CATEGORY_ACCENTS[name] ?? DEFAULT_ACCENT
}

// ── Brand logos per category ──────────────────────────────────────────────────
// { img } = logo file in /public/brands/; { label } = text badge fallback

interface BrandEntry { img?: string; label: string }

const CATEGORY_BRANDS: Record<string, BrandEntry[]> = {
  'Llantas': [
    { img: '/brands/tornel-logo.png',  label: 'Tornel' },
    { img: '/brands/michelin.png',     label: 'Michelin' },
    { img: '/brands/goodyear.png',     label: 'Goodyear' },
    { label: 'Bridgestone' },
    { label: 'Cooper' },
    { label: 'Euzkadi' },
  ],
  'Frenos': [
    { img: '/brands/fritec.png',       label: 'Fritec' },
    { label: 'Raybestos' },
    { label: 'Wagner' },
  ],
  'Filtros': [
    { img: '/brands/gonher-logo.png',  label: 'Gonher' },
    { img: '/brands/fleetguard.png',   label: 'Fleetguard' },
    { label: 'Fram' },
    { label: 'WIX' },
  ],
  'Suspensión': [
    { img: '/brands/boge-logo.png',    label: 'Boge' },
    { label: 'KYB' },
    { label: 'Monroe' },
  ],
  'Baleros': [
    { img: '/brands/timken.png',       label: 'Timken' },
    { label: 'NTN' },
    { label: 'SKF' },
    { label: 'NSK' },
  ],
  'Clutch': [
    { label: 'Valeo' },
    { label: 'LUK' },
    { label: 'Sachs' },
  ],
  'Bandas': [
    { img: '/brands/gates.png',        label: 'Gates' },
    { label: 'Continental' },
    { label: 'Dayco' },
  ],
  'Baterías': [
    { img: '/brands/gonher-logo.png',  label: 'Gonher' },
    { img: '/brands/lth-bateria.png',  label: 'LTH' },
  ],
  'Aceites': [
    { img: '/brands/mobil.png',        label: 'Mobil' },
    { img: '/brands/quaker.png',       label: 'Quaker State' },
    { img: '/brands/proone.png',       label: 'Pro-One' },
  ],
  'Herramientas': [
    { label: 'Stanley' },
    { label: 'Truper' },
  ],
  'Servicio pesado': [
    { img: '/brands/fleetguard.png', label: 'Fleetguard' },
    { label: 'Bendix' },
    { label: 'Haldex' },
    { label: 'TKL' },
  ],
  'Kits de afinación': [
    { img: '/brands/gonher-logo.png',  label: 'Gonher' },
    { label: 'NGK' },
    { label: 'Bosch' },
  ],
}

// ── Root catalog category definitions ────────────────────────────────────────

const CATALOG_CATS: { name: string; desc: string; img: string }[] = [
  { name: 'Llantas',           desc: 'Auto, camioneta, camión, moto, agrícola e industrial.',  img: '/brands/llantas.png' },
  { name: 'Frenos',            desc: 'Balatas, discos, tambores y componentes hidráulicos.',    img: '/brands/fritec.png' },
  { name: 'Filtros',           desc: 'Aceite, aire, gasolina, diésel y habitáculo.',            img: '/brands/filtros-gonher.png' },
  { name: 'Suspensión',        desc: 'Amortiguadores, rótulas, terminales y bujes.',            img: '/brands/suspension.png' },
  { name: 'Baleros',           desc: 'Rueda, motor, chumaceras y aplicaciones industriales.',   img: '/brands/baleros.png' },
  { name: 'Clutch',            desc: 'Discos, prensas, collarines y kits completos.',           img: '/brands/clutch.png' },
  { name: 'Bandas',            desc: 'Distribución, serpentín, poleas y tensores.',             img: '/brands/bandas.png' },
  { name: 'Baterías',          desc: 'Acumuladores para todo tipo de vehículo.',                img: '/brands/baterias.png' },
  { name: 'Aceites',           desc: 'Lubricantes y aditivos para motor y transmisión.',        img: '/brands/mobil-delvac-cubeta.png' },
  { name: 'Servicio pesado',   desc: 'Carga, diésel, frenos de aire y transmisión.',            img: '/brands/servicio_pesado.png' },
  { name: 'Herramientas',      desc: 'Herramienta general y especializada para taller.',        img: '/brands/herramientas.png' },
  { name: 'Kits de afinación', desc: 'Bujías, filtros y aceite según aplicación.',              img: '/brands/gonher-productos.png' },
]

// ── Subcategory icon map (by slug) ────────────────────────────────────────────

const SUBCAT_ICONS: Record<string, LucideIcon> = {
  'llanta-auto':        Car,
  'llanta-camion':      Truck,
  'llanta-agricola':    Leaf,
  'llanta-moto':        Bike,
  'llanta-industrial':  Factory,
  'llanta-cuatri-moto': Mountain,
  'camara-corbata':     Disc3,
}

// ── Root catalog category card ────────────────────────────────────────────────

function CatalogCatCard({ name, desc, img }: { name: string; desc: string; img: string }) {
  const catNode  = getCategoryNode(name)
  const catItems = getCatalogByCategory(name)
  // Llantas has its own dedicated page with live data
  const to = catNode?.children?.length
      ? `/catalogo?categoria=${encodeURIComponent(name)}`
      : catItems.length === 1
        ? `/catalogo/${catItems[0].categorySlug}/${catItems[0].slug}`
        : `/catalogo?categoria=${encodeURIComponent(name)}`

  return (
    <Link
      to={to}
      title={desc}
      className="group bg-white border border-gray-200 hover:border-j-orange rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
    >
      {/* Image area */}
      <div className="relative h-40 bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-6 py-5 flex-shrink-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-j-orange opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <img
          src={img}
          alt={name}
          className="max-h-[120px] max-w-[85%] object-contain scale-[1.05] group-hover:scale-[1.12] transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            const fb = e.currentTarget.parentElement?.querySelector('.icon-fallback') as HTMLElement | null
            if (fb) fb.style.removeProperty('display')
          }}
        />
        <span className="icon-fallback items-center justify-center" style={{ display: 'none' }}>
          <CategoryIcon name={name} size={52} className="text-j-steel/30 group-hover:text-j-orange/60 transition-colors duration-200" />
        </span>
      </div>
      {/* Label */}
      <div className="border-t border-gray-100 px-4 py-3 text-center">
        <span className="text-j-black font-bold text-sm sm:text-base leading-snug block">{name}</span>
      </div>
    </Link>
  )
}

// ── Search result product card ────────────────────────────────────────────────

function ItemCard({ item }: { item: typeof CATALOG_ITEMS[0] }) {
  return (
    <Link
      to={`/catalogo/${item.categorySlug}/${item.slug}`}
      className="bg-white border border-gray-200 hover:border-j-orange rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md group flex flex-col"
    >
      <div className="h-32 bg-j-gray flex items-center justify-center px-6 py-4 flex-shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="max-h-full max-w-full object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        ) : (
          <span className="text-j-steel/20 text-4xl font-black">{item.category[0]}</span>
        )}
      </div>
      <div className="p-4 border-t border-gray-100 flex flex-col flex-1">
        <p className="text-j-steel text-[10px] uppercase tracking-wider mb-1">{item.category}</p>
        <p className="text-j-black font-bold text-sm leading-snug">{item.title}</p>
        <p className="text-j-steel text-xs mt-1 leading-snug flex-1">{item.shortDescription}</p>
        <div className="flex items-center gap-1 mt-3 text-j-orange text-xs font-semibold">
          Ver más <ArrowRight size={12} />
        </div>
      </div>
    </Link>
  )
}

// ── Subcategory card (category landing) ───────────────────────────────────────

function SubcatCard({ sub }: { sub: SubcategoryCard }) {
  const Icon = SUBCAT_ICONS[sub.slug] ?? CircleDot
  const cardClass = "bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col"
  const inner = (
    <>
      {/* Icon / image area */}
      <div className="h-44 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center flex-shrink-0 relative">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-j-red opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        {sub.image ? (
          <img
            src={sub.image}
            alt={sub.name}
            className="max-h-[140px] max-w-[80%] object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-j-red/10 group-hover:bg-j-red/15 transition-colors flex items-center justify-center">
            <Icon size={32} className="text-j-red" />
          </div>
        )}
      </div>
      <div className="px-5 py-4 flex flex-col flex-1">
        <p className="text-j-black font-black text-base leading-snug mb-1.5">{sub.name}</p>
        <p className="text-j-steel text-sm leading-relaxed flex-1">{sub.description}</p>
        {sub.link && (
          <div className="flex items-center gap-1 mt-4 text-j-red text-sm font-bold">
            Ver productos <ArrowRight size={13} />
          </div>
        )}
      </div>
    </>
  )

  if (sub.link) {
    return (
      <Link to={sub.link} className={cardClass + " group hover:border-j-red hover:shadow-lg hover:-translate-y-1 transition-all duration-200"}>
        {inner}
      </Link>
    )
  }

  return <div className={cardClass + " group"}>{inner}</div>
}

// ── Premium product card (category-filtered view) ─────────────────────────────

function ProductCard({ item }: { item: typeof CATALOG_ITEMS[0] }) {
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(item.quotePrompt)}`
  const [imgFailed, setImgFailed] = useState(false)
  const showImg = !!item.image && !imgFailed

  return (
    <div className="group bg-white border border-gray-200 hover:border-j-orange rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col">

      {/* Image area */}
      <div
        className={`relative h-56 flex items-center justify-center overflow-hidden flex-shrink-0 ${
          showImg
            ? 'bg-gradient-to-b from-[#e8e4e0] to-[#b8b3ae]'
            : 'bg-gray-100'
        }`}
      >
        {showImg && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(-45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 36px)',
            }}
          />
        )}
        {showImg ? (
          <img
            src={item.image}
            alt={item.title}
            className="relative z-10 max-h-44 max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-300"
            style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.18))' }}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 px-4 text-center w-full h-full">
            <CircleDot size={36} className="text-gray-300 flex-shrink-0" />
            {item.brand && (
              <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">{item.brand}</span>
            )}
            <span className="text-gray-400 text-xs leading-snug">{item.title}</span>
          </div>
        )}
        {/* Category badge */}
        <span className="absolute top-3 left-3 z-20 bg-j-orange text-white text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full">
          {item.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        {item.brand && (
          <p className="text-j-orange text-sm font-black tracking-widest uppercase mb-1">{item.brand}</p>
        )}
        <p className="text-j-black font-bold text-lg leading-snug mb-1">{item.title}</p>
        {item.sku && (
          <p className="text-j-steel/60 text-xs font-mono mb-3">SKU: {item.sku}</p>
        )}

        {/* CTAs */}
        <div className="flex flex-col gap-2 mt-auto">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-j-red hover:bg-j-red-deep text-white font-bold text-sm px-4 py-2.5 rounded-lg transition-colors"
          >
            <MessageCircle size={14} />
            Cotizar por WhatsApp
          </a>
          <Link
            to={`/catalogo/${item.categorySlug}/${item.slug}`}
            className="inline-flex items-center justify-center gap-1 text-j-steel hover:text-j-black text-xs font-semibold py-1 transition-colors"
          >
            Ver detalle <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── DB tire card ─────────────────────────────────────────────────────────────

function DbTireCard({ product }: { product: DbProduct }) {
  const [imgFailed,   setImgFailed  ] = useState(false)
  const [lightbox,    setLightbox   ] = useState(false)
  const showImg = !!product.imagen_url && !imgFailed
  const size = parseDbTireSize(product.name)
  const waMsg = encodeURIComponent(
    `Hola, quiero cotizar la llanta: ${product.name} (SKU: ${product.sku})`
  )
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox])

  return (
    <>
      <div className="group bg-white border border-gray-200 hover:border-j-orange rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
        {/* Image area */}
        <div
          className={`relative h-44 flex items-center justify-center overflow-hidden flex-shrink-0 ${
            showImg ? 'bg-gray-50 cursor-zoom-in' : 'bg-gray-100'
          }`}
          onClick={() => showImg && setLightbox(true)}
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-j-orange opacity-0 group-hover:opacity-100 transition-opacity" />
          {showImg ? (
            <img
              src={product.imagen_url!}
              alt={product.name}
              className="max-h-36 max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-200"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="flex flex-col items-center gap-2 px-3 text-center">
              <CircleDot size={32} className="text-gray-300" />
              {size && (
                <span className="text-gray-600 text-sm font-black">
                  {size.ancho}/{size.alto}R{size.rin}
                </span>
              )}
            </div>
          )}
          {product.marca && (
            <span className="absolute top-2 left-2 z-10 bg-j-orange text-white text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full">
              {product.marca}
            </span>
          )}
        </div>
        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-j-black font-bold text-sm leading-snug mb-1">{product.name}</p>
          <p className="text-j-steel/60 text-[10px] font-mono mb-3">SKU: {product.sku}</p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center gap-2 bg-j-red hover:bg-j-red-deep text-white font-bold text-xs px-3 py-2.5 rounded-lg transition-colors"
          >
            <MessageCircle size={13} />
            Cotizar por WhatsApp
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && showImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>
            <div className="bg-gray-50 flex items-center justify-center p-6">
              <img
                src={product.imagen_url!}
                alt={product.name}
                className="max-h-[60vh] max-w-full object-contain"
              />
            </div>
            <div className="px-5 py-4 border-t border-gray-100">
              <p className="text-j-black font-bold text-sm">{product.name}</p>
              <p className="text-j-steel/60 text-[10px] font-mono mt-0.5">SKU: {product.sku}</p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 bg-j-red hover:bg-j-red-deep text-white font-bold text-sm px-4 py-2.5 rounded-lg transition-colors"
              >
                <MessageCircle size={14} />
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CatalogoPage() {
  const navigate     = useNavigate()
  const [params]     = useSearchParams()
  const q            = params.get('q') ?? ''
  const categoria    = params.get('categoria') ?? ''
  const sub          = params.get('sub') ?? ''

  const catNode             = categoria ? getCategoryNode(categoria) : undefined
  const hasCategoryChildren = !!(catNode?.children?.length)
  const subNode             = (sub && catNode) ? catNode.children?.find(c => c.slug === sub) : undefined
  const hasSubFilter        = !!(categoria && sub && subNode)

  const [brandFilter, setBrandFilter] = useState<string | null>(null)
  const [anchoFilter, setAnchoFilter] = useState('')
  const [altoFilter,  setAltoFilter ] = useState('')
  const [rinFilter,   setRinFilter  ] = useState('')

  const [dbProducts, setDbProducts] = useState<DbProduct[]>([])
  const [dbLoading,  setDbLoading  ] = useState(false)

  // Reset filters and fetch DB products when category/sub changes
  useEffect(() => {
    setBrandFilter(null)
    setAnchoFilter('')
    setAltoFilter('')
    setRinFilter('')
    setDbProducts([])

    // Determine which JSON file to load
    const file = CATALOG_BY_CATEGORIA[categoria]
      ?? CATALOG_BY_SUBCAT[categoria]?.[sub]
      ?? null
    if (!file) return
    setDbLoading(true)
    fetch(file)
      .then(r => r.json())
      .then((data: DbProduct[]) => { setDbProducts(data); setDbLoading(false) })
      .catch(() => setDbLoading(false))
  }, [categoria, sub])

  useEffect(() => {
    if (hasCategoryChildren) return
    if (categoria && !q) {
      const matches = CATALOG_ITEMS.filter(i => i.category === categoria)
      if (matches.length === 1) {
        navigate(`/catalogo/${matches[0].categorySlug}/${matches[0].slug}`, { replace: true })
      }
    }
  }, [categoria, q, navigate, hasCategoryChildren])

  const filtered = q
    ? searchCatalog(q)
    : categoria
      ? CATALOG_ITEMS.filter(i => i.category === categoria)
      : null

  const isFiltered = !!(q || categoria)

  if (!hasCategoryChildren && categoria && !q && filtered && filtered.length === 1) return null

  // ── Subcategory filtered view ─────────────────────────────────────────────────
  if (hasSubFilter && catNode && subNode && !q) {
    const subItems = getCatalogBySubcategory(categoria, sub)
    const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(subNode.quotePrompt)}`

    return (
      <div className="bg-j-gray min-h-screen">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-1.5 text-xs text-j-steel flex-wrap">
              <Link to="/" className="hover:text-j-black transition-colors">Inicio</Link>
              <ChevronRight size={12} className="flex-shrink-0" />
              <Link to="/catalogo" className="hover:text-j-black transition-colors">Catálogo</Link>
              <ChevronRight size={12} className="flex-shrink-0" />
              <Link to={`/catalogo?categoria=${encodeURIComponent(categoria)}`} className="hover:text-j-black transition-colors">{categoria}</Link>
              <ChevronRight size={12} className="flex-shrink-0" />
              <span className="text-j-black font-medium">{subNode.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-black text-j-black uppercase tracking-tight">{subNode.name}</h1>
            <p className="text-j-steel text-sm mt-1">{subNode.description}</p>
          </div>

          {/* DB products (when catalog file exists) */}
          {dbLoading && (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-j-red border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!dbLoading && dbProducts.length > 0 && (() => {
            const brands = Array.from(new Set(dbProducts.map(i => i.marca).filter(Boolean))).sort() as string[]
            const display = dbProducts.filter(i => !brandFilter || i.marca === brandFilter)
            return (
              <>
                {brands.length > 1 && (
                  <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-5 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-j-steel uppercase tracking-wider">Marca:</span>
                    <select
                      value={brandFilter ?? ''}
                      onChange={e => setBrandFilter(e.target.value || null)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-j-black focus:outline-none focus:ring-2 focus:ring-j-red/30 focus:border-j-red bg-white"
                    >
                      <option value="">Todas las marcas</option>
                      {brands.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    {brandFilter && (
                      <button onClick={() => setBrandFilter(null)} className="text-xs text-j-red font-semibold hover:underline">
                        Limpiar
                      </button>
                    )}
                  </div>
                )}
                <p className="text-j-steel text-xs mb-4">{display.length} producto{display.length !== 1 ? 's' : ''}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {display.map(item => <DbTireCard key={item.sku} product={item} />)}
                </div>
              </>
            )
          })()}

          {/* Hardcoded items fallback (when no DB file for this subcategory) */}
          {!dbLoading && dbProducts.length === 0 && (
            subItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {subItems.map(item => <ProductCard key={item.id} item={item} />)}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl px-6 py-10 text-center">
                <p className="text-j-black font-bold text-base mb-2">Consulta disponibilidad</p>
                <p className="text-j-steel text-sm mb-6 max-w-md mx-auto">{subNode.description}</p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-j-red hover:bg-j-red-deep text-white font-bold px-6 py-3 rounded-lg transition-colors"
                >
                  <MessageCircle size={17} />
                  Cotizar por WhatsApp
                </a>
              </div>
            )
          )}

          <div className="mt-6">
            <Link
              to={`/catalogo?categoria=${encodeURIComponent(categoria)}`}
              className="text-j-steel hover:text-j-black text-sm font-medium transition-colors"
            >
              ← Volver a {categoria}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Category landing (parent category with subcategory children) ─────────────
  if (hasCategoryChildren && catNode && !q) {
    return (
      <div className="bg-j-gray min-h-screen">

        {/* ── Hero banner ── */}
        {(() => {
          const [accentGlow, accentHex] = getCategoryAccent(catNode.name)
          return (
            <div
              className="relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0c0c0c 0%, #161616 55%, #111111 100%)' }}
            >
              {/* Accent radial glow — bottom-left */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 60% 80% at -8% 90%, ${accentGlow} 0%, transparent 60%)`,
                }}
              />
              {/* Faint diagonal technical texture */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 40px)',
                  opacity: 0.016,
                }}
              />
              {/* Bottom fade */}
              <div
                className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.25))' }}
              />

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-14">

                  {/* ── Text column ── */}
                  <div className="flex-1 min-w-0" style={{ animation: 'hero-in 0.65s ease-out both' }}>
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-7">
                      <Link to="/" className="hover:text-white/55 transition-colors">Inicio</Link>
                      <ChevronRight size={11} className="flex-shrink-0 opacity-40" />
                      <Link to="/catalogo" className="hover:text-white/55 transition-colors">Catálogo</Link>
                      <ChevronRight size={11} className="flex-shrink-0 opacity-40" />
                      <span className="text-white/50">{catNode.name}</span>
                    </nav>

                    {/* Department label */}
                    <span className="inline-flex items-center gap-2 mb-4">
                      <span className="w-4 h-px" style={{ background: accentHex }} />
                      <span className="text-[10px] font-black tracking-[0.28em] uppercase" style={{ color: accentHex }}>
                        Departamento
                      </span>
                    </span>

                    {/* Main title */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.88] uppercase tracking-tight mb-5">
                      {catNode.name}
                    </h1>

                    {catNode.tagline && (
                      <p className="text-zinc-300 text-base sm:text-lg max-w-md leading-relaxed mb-2">
                        {catNode.tagline}
                      </p>
                    )}
                    {catNode.searchHint && (
                      <p className="text-zinc-500 text-sm italic mb-6">{catNode.searchHint}</p>
                    )}

                    {/* Context chips */}
                    {catNode.tags && catNode.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-5">
                        {catNode.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-zinc-300 text-xs font-medium"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accentHex }} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ── Premium image stage ── */}
                  {catNode.image && (
                    <div
                      className="flex-shrink-0 w-full lg:w-[360px] xl:w-[420px] h-[220px] sm:h-[260px] lg:h-[300px] xl:h-[340px] flex items-center justify-center relative rounded-3xl overflow-hidden"
                      style={{
                        background: 'radial-gradient(ellipse at 50% 60%, #1e1e1e 0%, #0e0e0e 100%)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                      }}
                      aria-hidden="true"
                    >
                      {/* Diagonal texture inside card */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 32px)',
                          opacity: 0.012,
                        }}
                      />
                      {/* Accent glow behind product */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse 70% 55% at 50% 62%, ${accentGlow} 0%, transparent 70%)`,
                        }}
                      />
                      {/* Blurred glow blob */}
                      <div
                        className="absolute w-32 h-32 rounded-full pointer-events-none"
                        style={{
                          background: accentHex,
                          opacity: 0.08,
                          filter: 'blur(40px)',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                      {/* Product image */}
                      <img
                        src={catNode.image}
                        alt={catNode.name}
                        className="relative z-10 max-h-[170px] sm:max-h-[200px] lg:max-h-[230px] xl:max-h-[270px] max-w-[84%] object-contain"
                        style={{ filter: 'drop-shadow(0 12px 36px rgba(0,0,0,0.7)) drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}
                      />
                    </div>
                  )}

                </div>
              </div>
            </div>
          )
        })()}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Section label */}
          <p className="text-j-steel text-[10px] font-black uppercase tracking-widest mb-5">
            Selecciona una categoría
          </p>

          {/* Subcategory card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {catNode.children!.map(sub => (
              <SubcatCard key={sub.slug} sub={sub} />
            ))}
          </div>

          {/* Brands strip */}
          {(CATEGORY_BRANDS[catNode.name] ?? []).length > 0 && (
            <div className="mt-8 bg-white border border-gray-200 rounded-xl px-6 py-5">
              <p className="text-j-black font-black text-[10px] uppercase tracking-widest mb-4">
                Marcas que manejamos
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {(CATEGORY_BRANDS[catNode.name] ?? []).map(({ img, label }) =>
                  img ? (
                    <img
                      key={label}
                      src={img}
                      alt={label}
                      className="h-7 object-contain opacity-70 hover:opacity-100 transition-opacity"
                      onError={(e) => {
                        const el = e.currentTarget
                        const badge = document.createElement('span')
                        badge.className = 'border border-gray-200 rounded-lg px-3 py-1.5 text-j-steel text-xs font-semibold'
                        badge.textContent = label
                        el.parentElement?.replaceChild(badge, el)
                      }}
                    />
                  ) : (
                    <span
                      key={label}
                      className="border border-gray-200 rounded-lg px-3 py-1.5 text-j-steel text-xs font-semibold hover:border-j-red hover:text-j-red transition-colors cursor-default select-none"
                    >
                      {label}
                    </span>
                  )
                )}
              </div>
            </div>
          )}

          {/* WhatsApp CTA */}
          <div className="mt-4 bg-j-red rounded-xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-white font-bold text-sm">¿No encuentras tu medida?</p>
              <p className="text-white/70 text-xs mt-0.5">
                Pregunta por número de parte, medida, marca o aplicación de vehículo.
              </p>
            </div>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-j-red hover:bg-j-warm font-bold text-sm px-5 py-2.5 rounded-lg transition-colors flex-shrink-0"
            >
              <MessageCircle size={15} />
              Cotizar por WhatsApp
            </a>
          </div>

        </div>
      </div>
    )
  }

  // ── Standard catalog view ─────────────────────────────────────────────────────

  // Parse tire size from title: "185/70R13" or "155 70 13 BRAND"
  function parseTireSize(title: string) {
    const m1 = title.match(/(\d{3})\/(\d{2})R(\d{2})/i)
    if (m1) return { ancho: m1[1], alto: m1[2], rin: m1[3] }
    const m2 = title.match(/^(\d{3})\s+(\d{2})\s+(\d{2})\b/)
    if (m2) return { ancho: m2[1], alto: m2[2], rin: m2[3] }
    return null
  }

  // DB products take priority when available for this category
  const useDb = dbProducts.length > 0
  const srcDb  = dbProducts
  const srcCat = filtered ?? []

  const allBrands = Array.from(new Set(
    useDb
      ? srcDb.map(i => i.marca).filter(Boolean)
      : srcCat.map(i => i.brand).filter(Boolean)
  )).sort() as string[]

  const allAnchos = Array.from(new Set(
    (useDb ? srcDb.map(i => parseTireSize(i.name)) : srcCat.map(i => parseTireSize(i.title)))
      .map(s => s?.ancho).filter(Boolean)
  )).sort() as string[]

  const allAltos = Array.from(new Set(
    (useDb ? srcDb : srcCat)
      .filter(i => !anchoFilter || parseTireSize(useDb ? (i as DbProduct).name : (i as typeof CATALOG_ITEMS[0]).title)?.ancho === anchoFilter)
      .map(i => parseTireSize(useDb ? (i as DbProduct).name : (i as typeof CATALOG_ITEMS[0]).title)?.alto)
      .filter(Boolean)
  )).sort((a, b) => parseInt(a as string) - parseInt(b as string)) as string[]

  const allRins = Array.from(new Set(
    (useDb ? srcDb : srcCat)
      .filter(i => !anchoFilter || parseTireSize(useDb ? (i as DbProduct).name : (i as typeof CATALOG_ITEMS[0]).title)?.ancho === anchoFilter)
      .filter(i => !altoFilter  || parseTireSize(useDb ? (i as DbProduct).name : (i as typeof CATALOG_ITEMS[0]).title)?.alto  === altoFilter)
      .map(i => parseTireSize(useDb ? (i as DbProduct).name : (i as typeof CATALOG_ITEMS[0]).title)?.rin)
      .filter(Boolean)
  )).sort((a, b) => parseInt(a as string) - parseInt(b as string)) as string[]

  const filteredDbItems = srcDb
    .filter(i => !brandFilter || i.marca === brandFilter)
    .filter(i => {
      if (!anchoFilter && !altoFilter && !rinFilter) return true
      const s = parseTireSize(i.name)
      return (!anchoFilter || s?.ancho === anchoFilter) &&
             (!altoFilter  || s?.alto  === altoFilter)  &&
             (!rinFilter   || s?.rin   === rinFilter)
    })
    .sort((a, b) => {
      const sa = parseTireSize(a.name)
      const sb = parseTireSize(b.name)
      const rinDiff = parseInt(sa?.rin ?? '99') - parseInt(sb?.rin ?? '99')
      if (rinDiff !== 0) return rinDiff
      const anchoDiff = parseInt(sa?.ancho ?? '0') - parseInt(sb?.ancho ?? '0')
      if (anchoDiff !== 0) return anchoDiff
      const altoDiff = parseInt(sa?.alto ?? '0') - parseInt(sb?.alto ?? '0')
      if (altoDiff !== 0) return altoDiff
      return a.name.localeCompare(b.name)
    })

  const displayItems = srcCat
    .filter(i => !brandFilter || i.brand === brandFilter)
    .filter(i => {
      if (!anchoFilter && !altoFilter && !rinFilter) return true
      const s = parseTireSize(i.title)
      return (!anchoFilter || s?.ancho === anchoFilter) &&
             (!altoFilter  || s?.alto  === altoFilter)  &&
             (!rinFilter   || s?.rin   === rinFilter)
    })

  const showFilters  = !!(categoria && !q && (useDb ? srcDb.length > 0 : srcCat.length > 0))
  const anyDimFilter = !!(anchoFilter || altoFilter || rinFilter)

  return (
    <div className="bg-j-gray min-h-screen">

      {/* Page header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

          {categoria && (
            <nav className="flex items-center gap-1.5 text-xs text-j-steel mb-3">
              <Link to="/" className="hover:text-j-black transition-colors">Inicio</Link>
              <ChevronRight size={12} className="flex-shrink-0" />
              <Link to="/catalogo" className="hover:text-j-black transition-colors">Catálogo</Link>
              <ChevronRight size={12} className="flex-shrink-0" />
              <span className="text-j-black font-medium">{categoria}</span>
            </nav>
          )}

          <h1 className="text-2xl font-black text-j-black uppercase tracking-tight">
            {categoria || 'Catálogo'}
          </h1>
          {q && (
            <p className="text-j-steel text-sm mt-0.5">
              {filtered!.length} resultado{filtered!.length !== 1 ? 's' : ''} para &ldquo;{q}&rdquo;
            </p>
          )}
          {!isFiltered && (
            <p className="text-j-steel text-sm mt-0.5">
              Refacciones y llantas. Consulta disponibilidad por WhatsApp.
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Empty state — only show when no DB data is available or loading */}
        {isFiltered && filtered!.length === 0 && !useDb && !dbLoading && (
          <div className="text-center py-20">
            <p className="text-j-black font-bold text-lg mb-2">No encontramos coincidencias.</p>
            <p className="text-j-steel text-sm mb-6">
              Pregunta por número de parte, marca, medida o aplicación.
            </p>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-j-red hover:bg-j-red-deep text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              <MessageCircle size={17} />
              Cotizar por WhatsApp
            </a>
          </div>
        )}

        {/* Filters: dropdowns for brand + dimensions */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-4 mb-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-j-steel uppercase tracking-wider">Filtrar:</span>

              {/* Brand dropdown */}
              {allBrands.length > 1 && (
                <select
                  value={brandFilter ?? ''}
                  onChange={e => setBrandFilter(e.target.value || null)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-j-black focus:outline-none focus:ring-2 focus:ring-j-red/30 focus:border-j-red bg-white"
                >
                  <option value="">Marca</option>
                  {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              )}

            {/* Dimension selects */}
            {allAnchos.length > 0 && (
              <>

                <select
                  value={anchoFilter}
                  onChange={e => { setAnchoFilter(e.target.value); setAltoFilter(''); setRinFilter('') }}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-j-black focus:outline-none focus:ring-2 focus:ring-j-red/30 focus:border-j-red bg-white"
                >
                  <option value="">Ancho</option>
                  {allAnchos.map(v => <option key={v} value={v}>{v}</option>)}
                </select>

                <select
                  value={altoFilter}
                  onChange={e => { setAltoFilter(e.target.value); setRinFilter('') }}
                  disabled={!anchoFilter}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-j-black focus:outline-none focus:ring-2 focus:ring-j-red/30 focus:border-j-red bg-white disabled:opacity-40"
                >
                  <option value="">Alto</option>
                  {allAltos.map(v => <option key={v} value={v}>{v}</option>)}
                </select>

                <select
                  value={rinFilter}
                  onChange={e => setRinFilter(e.target.value)}
                  disabled={!anchoFilter}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-j-black focus:outline-none focus:ring-2 focus:ring-j-red/30 focus:border-j-red bg-white disabled:opacity-40"
                >
                  <option value="">Rin</option>
                  {allRins.map(v => <option key={v} value={v}>{v}</option>)}
                </select>

                {(anyDimFilter || brandFilter) && (
                  <button
                    onClick={() => { setBrandFilter(null); setAnchoFilter(''); setAltoFilter(''); setRinFilter('') }}
                    className="text-xs text-j-red font-semibold hover:underline"
                  >
                    Limpiar
                  </button>
                )}
              </>
            )}
            </div>
          </div>
        )}

        {/* DB product grid (tire categories with catalog files) */}
        {useDb && !q && (
          dbLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-j-red border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredDbItems.length > 0 ? (
            <>
              <p className="text-j-steel text-xs mb-4">{filteredDbItems.length} producto{filteredDbItems.length !== 1 ? 's' : ''}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredDbItems.map(item => <DbTireCard key={item.sku} product={item} />)}
              </div>
            </>
          ) : (brandFilter || anyDimFilter) ? (
            <div className="bg-white border border-gray-200 rounded-xl px-6 py-10 text-center">
              <p className="text-j-black font-bold text-base mb-2">Sin resultados</p>
              <p className="text-j-steel text-sm mb-4">Intenta otra medida o consulta por WhatsApp.</p>
              <button
                onClick={() => { setBrandFilter(null); setAnchoFilter(''); setAltoFilter(''); setRinFilter('') }}
                className="text-j-red text-sm font-semibold hover:underline"
              >
                Ver todos
              </button>
            </div>
          ) : null
        )}

        {/* Category-filtered product grid (non-tire categories) */}
        {!useDb && categoria && !q && isFiltered && filtered!.length > 1 && (
          displayItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayItems.map(item => <ProductCard key={item.id} item={item} />)}
            </div>
          ) : (brandFilter || anyDimFilter) ? (
            <div className="bg-white border border-gray-200 rounded-xl px-6 py-10 text-center">
              <p className="text-j-black font-bold text-base mb-2">Sin resultados</p>
              <p className="text-j-steel text-sm mb-4">Intenta otra medida o consulta por WhatsApp.</p>
              <button
                onClick={() => { setBrandFilter(null); setAnchoFilter(''); setAltoFilter(''); setRinFilter('') }}
                className="text-j-red text-sm font-semibold hover:underline"
              >
                Ver todos
              </button>
            </div>
          ) : null
        )}

        {/* Search results — compact cards */}
        {q && isFiltered && filtered!.length > 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered!.map(item => <ItemCard key={item.id} item={item} />)}
          </div>
        )}

        {/* Root catalog — department card grid */}
        {!isFiltered && (
          <>
            <p className="text-j-steel text-[10px] font-black uppercase tracking-widest mb-5">
              Departamentos
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {CATALOG_CATS.map(cat => (
                <CatalogCatCard key={cat.name} {...cat} />
              ))}
            </div>

            <div className="mt-8 bg-white border border-gray-200 rounded-xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-j-black font-bold text-sm">¿No encuentras lo que buscas?</p>
                <p className="text-j-steel text-xs mt-0.5">
                  Pregunta por número de parte, marca, medida o aplicación.
                </p>
              </div>
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-j-red hover:bg-j-red-deep text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors flex-shrink-0"
              >
                <MessageCircle size={15} />
                Cotizar por WhatsApp
              </a>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

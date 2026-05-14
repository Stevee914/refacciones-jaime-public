import { useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import {
  MessageCircle, ArrowRight, ChevronRight,
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

const CATALOG_CATS: { name: string; desc: string }[] = [
  { name: 'Llantas',           desc: 'Auto, camioneta, camión, moto, agrícola e industrial.' },
  { name: 'Frenos',            desc: 'Balatas, discos, tambores y componentes hidráulicos.' },
  { name: 'Filtros',           desc: 'Aceite, aire, gasolina, diésel y habitáculo.' },
  { name: 'Suspensión',        desc: 'Amortiguadores, rótulas, terminales y bujes.' },
  { name: 'Baleros',           desc: 'Rueda, motor, chumaceras y aplicaciones industriales.' },
  { name: 'Clutch',            desc: 'Discos, prensas, collarines y kits completos.' },
  { name: 'Bandas',            desc: 'Distribución, serpentín, poleas y tensores.' },
  { name: 'Baterías',          desc: 'Acumuladores para todo tipo de vehículo.' },
  { name: 'Aceites',           desc: 'Lubricantes y aditivos para motor y transmisión.' },
  { name: 'Servicio pesado',   desc: 'Carga, diésel, frenos de aire y transmisión.' },
  { name: 'Herramientas',      desc: 'Herramienta general y especializada para taller.' },
  { name: 'Kits de afinación', desc: 'Bujías, filtros y aceite según aplicación.' },
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

function CatalogCatCard({ name, desc }: { name: string; desc: string }) {
  const catNode  = getCategoryNode(name)
  const catItems = getCatalogByCategory(name)
  const to = catNode?.children?.length
    ? `/catalogo?categoria=${encodeURIComponent(name)}`
    : catItems.length === 1
      ? `/catalogo/${catItems[0].categorySlug}/${catItems[0].slug}`
      : `/catalogo?categoria=${encodeURIComponent(name)}`

  return (
    <Link
      to={to}
      className="group bg-white border border-gray-200 hover:border-j-red rounded-xl p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col gap-4"
    >
      <div className="w-10 h-10 rounded-lg bg-j-red/10 group-hover:bg-j-red flex items-center justify-center transition-colors duration-200 flex-shrink-0">
        <CategoryIcon
          name={name}
          size={20}
          className="text-j-red group-hover:text-white transition-colors duration-200"
        />
      </div>
      <div className="flex-1">
        <p className="text-j-black font-bold text-sm leading-snug">{name}</p>
        <p className="text-j-steel text-xs mt-1 leading-snug">{desc}</p>
      </div>
      <div className="flex items-center gap-1 text-j-red text-xs font-semibold">
        Explorar <ArrowRight size={11} />
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
  const cardClass = "bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col"
  const inner = (
    <>
      {sub.image ? (
        <div className="h-36 bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-5 py-4 flex-shrink-0">
          <img
            src={sub.image}
            alt={sub.name}
            className="max-h-full max-w-[85%] object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>
      ) : (
        <div className="px-5 pt-5 pb-0">
          <div className="w-11 h-11 rounded-xl bg-j-red/10 flex items-center justify-center mb-4 flex-shrink-0">
            <Icon size={22} className="text-j-red" />
          </div>
        </div>
      )}
      <div className="px-5 pb-4 pt-3 flex flex-col flex-1">
        <p className="text-j-black font-bold text-sm leading-snug mb-1.5">{sub.name}</p>
        <p className="text-j-steel text-xs leading-relaxed flex-1">{sub.description}</p>
        {sub.link && (
          <div className="flex items-center gap-1 mt-3 text-j-red text-xs font-semibold">
            Ver productos <ArrowRight size={11} />
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

  return <div className={cardClass}>{inner}</div>
}

// ── Premium product card (category-filtered view) ─────────────────────────────

function ProductCard({ item }: { item: typeof CATALOG_ITEMS[0] }) {
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(item.quotePrompt)}`

  return (
    <div className="group bg-white border border-gray-200 hover:border-j-orange rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col">

      {/* Image area */}
      <div
        className="relative h-72 flex items-center justify-center overflow-hidden flex-shrink-0"
        style={{ background: 'radial-gradient(ellipse at center, #dedad6 0%, #b8b3ae 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 36px)',
          }}
        />
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="relative z-10 max-h-56 max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-300"
            style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.18))' }}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        ) : (
          <span className="text-black/10 text-7xl font-black select-none z-10">T</span>
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

          {subItems.length > 0 ? (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

        {/* Empty state */}
        {isFiltered && filtered!.length === 0 && (
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

        {/* Category-filtered product grid — premium cards with dual CTA */}
        {categoria && !q && isFiltered && filtered!.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered!.map(item => <ProductCard key={item.id} item={item} />)}
          </div>
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

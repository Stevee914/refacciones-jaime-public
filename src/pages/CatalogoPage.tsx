import { useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import {
  MessageCircle, ArrowRight, ChevronRight,
  CircleDot, Disc3, Filter, Gauge, Cog, RotateCcw, RotateCw,
  Battery, Droplets, Wrench, Package, Truck, Car, Bike, Factory, Mountain, Leaf,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  CATALOG_ITEMS,
  searchCatalog,
  getCategoryNode,
  getCatalogByCategory,
} from '../data/publicCatalog'
import type { SubcategoryCard } from '../data/publicCatalog'
import { WHATSAPP_NUMBER, WHATSAPP_MSG_CTA } from '../config'

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG_CTA}`

// ── Root catalog category definitions ────────────────────────────────────────

const CATALOG_CATS: { name: string; desc: string; Icon: LucideIcon; img?: string }[] = [
  { name: 'Llantas',           Icon: CircleDot,  desc: 'Auto, camioneta, camión, moto, agrícola e industrial.' },
  { name: 'Frenos',            Icon: Disc3,       desc: 'Balatas, discos, tambores y componentes hidráulicos.' },
  { name: 'Filtros',           Icon: Filter,      desc: 'Aceite, aire, gasolina, diésel y habitáculo.' },
  { name: 'Suspensión',        Icon: Gauge,       desc: 'Amortiguadores, rótulas, terminales y bujes.' },
  { name: 'Baleros',           Icon: RotateCcw,   desc: 'Rueda, motor, chumaceras y aplicaciones industriales.' },
  { name: 'Clutch',            Icon: Cog,         desc: 'Discos, prensas, collarines y kits completos.' },
  { name: 'Bandas',            Icon: RotateCw,    desc: 'Distribución, serpentín, poleas y tensores.' },
  { name: 'Baterías',          Icon: Battery,     desc: 'Acumuladores para todo tipo de vehículo.' },
  { name: 'Aceites',           Icon: Droplets,    desc: 'Lubricantes y aditivos para motor y transmisión.' },
  { name: 'Servicio pesado',   Icon: Truck,       desc: 'Carga, diésel, frenos de aire y transmisión.' },
  { name: 'Herramientas',      Icon: Wrench,      desc: 'Herramienta general y especializada para taller.', img: '/brands/herramientas.png' },
  { name: 'Kits de afinación', Icon: Package,     desc: 'Bujías, filtros y aceite según aplicación.' },
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

function CatalogCatCard({ name, desc, Icon, img }: { name: string; desc: string; Icon: LucideIcon; img?: string }) {
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
      <div className="w-10 h-10 rounded-lg bg-j-red/10 group-hover:bg-j-red flex items-center justify-center transition-colors duration-200 flex-shrink-0 overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={name}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              const fallback = e.currentTarget.parentElement?.querySelector('.icon-fb') as HTMLElement | null
              if (fallback) fallback.style.display = 'flex'
            }}
          />
        ) : null}
        <span
          className="icon-fb items-center justify-center"
          style={{ display: img ? 'none' : 'flex' }}
        >
          <Icon size={20} className="text-j-red group-hover:text-white transition-colors duration-200" />
        </span>
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
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(sub.quotePrompt)}`
  const Icon = SUBCAT_ICONS[sub.slug] ?? CircleDot

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white border border-gray-200 hover:border-j-red rounded-xl p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col"
    >
      <div className="w-11 h-11 rounded-xl bg-j-red/10 group-hover:bg-j-red flex items-center justify-center mb-4 transition-colors duration-200 flex-shrink-0">
        <Icon size={22} className="text-j-red group-hover:text-white transition-colors duration-200" />
      </div>
      <p className="text-j-black font-bold text-sm leading-snug mb-1.5">{sub.name}</p>
      <p className="text-j-steel text-xs leading-relaxed flex-1">{sub.description}</p>
      <div className="flex items-center gap-1.5 mt-4 text-j-red text-xs font-semibold">
        Ver categoría <ArrowRight size={12} />
      </div>
    </a>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CatalogoPage() {
  const navigate     = useNavigate()
  const [params]     = useSearchParams()
  const q            = params.get('q') ?? ''
  const categoria    = params.get('categoria') ?? ''

  const catNode             = categoria ? getCategoryNode(categoria) : undefined
  const hasCategoryChildren = !!(catNode?.children?.length)

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

  // ── Category landing (parent category with subcategory children) ─────────────
  if (hasCategoryChildren && catNode && !q) {
    return (
      <div className="bg-j-gray min-h-screen">

        {/* ── Hero banner ── */}
        <div
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a0808 0%, #252525 100%)' }}
        >
          {/* Diagonal stripe texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 26px)',
            }}
          />

          {/* Red radial glow — left anchor */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 55% 80% at 0% 50%, rgba(225,37,27,0.25) 0%, transparent 70%)',
            }}
          />

          {/* Tire image — right side, large and faint */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[500px] pointer-events-none" style={{ opacity: 0.11 }}>
            <img
              src="/brands/llantas.png"
              alt=""
              className="absolute right-10 top-1/2 -translate-y-1/2 max-h-[360px] object-contain"
            />
          </div>

          {/* Red left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-j-red" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-1.5 text-xs text-white/40 mb-6"
              style={{ animation: 'hero-in 0.55s ease-out both' }}
            >
              <Link to="/" className="hover:text-white/70 transition-colors">Inicio</Link>
              <ChevronRight size={12} className="flex-shrink-0" />
              <Link to="/catalogo" className="hover:text-white/70 transition-colors">Catálogo</Link>
              <ChevronRight size={12} className="flex-shrink-0" />
              <span className="text-white/70">{catNode.name}</span>
            </nav>

            <div style={{ animation: 'hero-in 0.7s ease-out 80ms both' }}>
              <span className="inline-block text-j-red text-[10px] font-black tracking-[0.22em] uppercase mb-3">
                Departamento
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tight mb-3">
                {catNode.name}
              </h1>
              {catNode.tagline && (
                <p className="text-white/65 text-sm sm:text-base max-w-lg leading-relaxed">
                  {catNode.tagline}
                </p>
              )}
              {catNode.searchHint && (
                <p className="text-white/38 text-xs mt-2 italic">{catNode.searchHint}</p>
              )}
            </div>
          </div>
        </div>

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
          <div className="mt-8 bg-white border border-gray-200 rounded-xl px-6 py-5">
            <p className="text-j-black font-black text-[10px] uppercase tracking-widest mb-4">
              Marcas que manejamos
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <img
                src="/brands/tornel-logo.png"
                alt="Tornel"
                className="h-7 object-contain opacity-75 hover:opacity-100 transition-opacity"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              {['Michelin', 'Kumho', 'Goodyear'].map(brand => (
                <span
                  key={brand}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-j-steel text-xs font-semibold hover:border-j-red hover:text-j-red transition-colors cursor-default select-none"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

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

        {/* Search / filtered results grid */}
        {isFiltered && filtered!.length > 1 && (
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

import { useEffect, useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronRight, MessageCircle, X } from 'lucide-react'
import { loadLlantas, cleanName, buildWhatsAppMsg } from '../services/llantasService'
import type { LlantaProduct, LlantaCategory } from '../services/llantasService'
import { WHATSAPP_NUMBER } from '../config'

const WA_BASE = `https://wa.me/${WHATSAPP_NUMBER}?text=`
const PAGE_SIZE = 24

// Subcategory display names
const CAT_LABELS: Record<string, string> = {
  'LLANTA AUTO':          'Llanta Auto',
  'LLANTA CAMION':        'Llanta Camión',
  'LLANTA AGRICOLA':      'Llanta Agrícola',
  'LLANTA MOTO':          'Llanta Moto',
  'LLANTA CUATRI-MOTO':   'Cuatrimoto',
  'LLANTA INDUSTRIAL':    'Industrial / Mueve Tierra',
  'CAMARA Y CORBATA':     'Cámaras y Corbatas',
}

// ── Tire placeholder ────────────────────────────────────────────────────────
function TirePlaceholder({ dim }: { dim?: LlantaProduct['dim'] }) {
  return (
    <div className="relative h-52 flex flex-col items-center justify-center"
         style={{ background: 'radial-gradient(ellipse at center, #dedad6 0%, #b8b3ae 100%)' }}>
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: 'repeating-linear-gradient(-45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 36px)' }} />
      {/* Tire ring SVG */}
      <svg viewBox="0 0 80 80" className="w-24 h-24 opacity-20 z-10" fill="none">
        <circle cx="40" cy="40" r="36" stroke="#111" strokeWidth="10"/>
        <circle cx="40" cy="40" r="18" stroke="#111" strokeWidth="6"/>
        <circle cx="40" cy="40" r="8"  fill="#111"/>
      </svg>
      {/* Dimension label */}
      {dim && (
        <span className="absolute bottom-3 z-10 bg-black/60 text-white text-[11px] font-mono px-2.5 py-0.5 rounded-full">
          {dim.ancho}{dim.perfil ? `/${dim.perfil}` : ''}{dim.rin ? `R${dim.rin}` : ''}
        </span>
      )}
    </div>
  )
}

// ── Product card ────────────────────────────────────────────────────────────
function LlantaCard({ product }: { product: LlantaProduct }) {
  const waHref = WA_BASE + buildWhatsAppMsg(product)
  const displayName = cleanName(product.name, product.marca)

  return (
    <div className="group bg-white border border-gray-200 hover:border-j-orange rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col">
      <div className="relative flex-shrink-0">
        <TirePlaceholder dim={product.dim} />
        <span className="absolute top-3 left-3 z-20 bg-j-orange text-white text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full">
          {CAT_LABELS[product.cat_name as string] ?? 'Llanta'}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        {product.marca && (
          <p className="text-j-orange text-xs font-black tracking-widest uppercase mb-1">
            {product.marca}
          </p>
        )}
        <p className="text-j-black font-bold text-sm leading-snug mb-1 flex-1">{displayName}</p>
        <p className="text-gray-400 text-[11px] font-mono mb-3">SKU: {product.sku}</p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-j-red hover:bg-j-red-deep text-white font-bold text-sm px-4 py-2.5 rounded-lg transition-colors"
        >
          <MessageCircle size={14} />
          Cotizar por WhatsApp
        </a>
      </div>
    </div>
  )
}

// ── Select filter ────────────────────────────────────────────────────────────
function DimSelect({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void
}) {
  if (!options.length) return null
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-j-black bg-white focus:outline-none focus:border-j-orange"
    >
      <option value="">{label}</option>
      {options.map(o => (
        <option key={o} value={o}>
          {label === 'RIN' ? `R${o}` : o}
        </option>
      ))}
    </select>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function LlantasPage() {
  const [params, setParams] = useSearchParams()

  const subcat  = params.get('sub') ?? ''
  const ancho   = params.get('ancho') ?? ''
  const perfil  = params.get('perfil') ?? ''
  const rin     = params.get('rin') ?? ''
  const q       = params.get('q') ?? ''
  const page    = Math.max(1, parseInt(params.get('page') ?? '1', 10))

  const [all, setAll]         = useState<LlantaProduct[]>([])
  const [cats, setCats]       = useState<LlantaCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLlantas().then(data => {
      setAll(data.products as any)
      setCats(data.categories)
      setLoading(false)
    })
  }, [])

  // Subcats (children of LLANTAS root)
  const subcats = useMemo(() =>
    cats.filter(c => c.parent_id !== null), [cats])

  // Filter products
  const filtered = useMemo(() => {
    let list = all
    if (subcat) {
      const cat = cats.find(c => c.name.toUpperCase() === subcat.toUpperCase())
      if (cat) list = list.filter(p => p.categoria_id === cat.id)
    }
    if (ancho)  list = list.filter(p => p.dim?.ancho  === ancho)
    if (perfil) list = list.filter(p => p.dim?.perfil === perfil)
    if (rin)    list = list.filter(p => p.dim?.rin    === rin)
    if (q)      list = list.filter(p =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      (p.marca ?? '').toLowerCase().includes(q.toLowerCase()) ||
      p.sku.toLowerCase().includes(q.toLowerCase()))
    return list
  }, [all, cats, subcat, ancho, perfil, rin, q])

  // Distinct dim values from current subcat selection
  const base = useMemo(() => {
    if (!subcat) return all
    const cat = cats.find(c => c.name.toUpperCase() === subcat.toUpperCase())
    return cat ? all.filter(p => p.categoria_id === cat.id) : all
  }, [all, cats, subcat])

  const anchos  = useMemo(() => [...new Set(base.map(p => p.dim?.ancho).filter(Boolean))].sort((a,b) => parseFloat(a!)-parseFloat(b!)) as string[], [base])
  const perfiles= useMemo(() => [...new Set(base.map(p => p.dim?.perfil).filter(Boolean))].sort((a,b) => parseFloat(a!)-parseFloat(b!)) as string[], [base])
  const rines   = useMemo(() => [...new Set(base.map(p => p.dim?.rin).filter(Boolean))].sort((a,b) => parseFloat(a!)-parseFloat(b!)) as string[], [base])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE)
  const hasFilters = !!(subcat || ancho || perfil || rin || q)

  function set(key: string, val: string) {
    setParams(prev => {
      const next = new URLSearchParams(prev)
      if (val) next.set(key, val); else next.delete(key)
      next.delete('page')
      return next
    }, { replace: true })
  }
  function clearFilters() {
    setParams({ }, { replace: true })
  }

  return (
    <div className="bg-j-gray min-h-screen">

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-1.5 text-xs text-j-steel mb-3 flex-wrap">
            <Link to="/" className="hover:text-j-black">Inicio</Link>
            <ChevronRight size={12} />
            <Link to="/catalogo" className="hover:text-j-black">Catálogo</Link>
            <ChevronRight size={12} />
            {subcat ? (
              <>
                <button onClick={() => set('sub','')} className="hover:text-j-black">Llantas</button>
                <ChevronRight size={12} />
                <span className="text-j-black font-medium">{CAT_LABELS[subcat] ?? subcat}</span>
              </>
            ) : (
              <span className="text-j-black font-medium">Llantas</span>
            )}
          </nav>
          <h1 className="text-2xl font-black text-j-black uppercase tracking-tight">
            {subcat ? (CAT_LABELS[subcat] ?? subcat) : 'Llantas'}
          </h1>
          <p className="text-j-steel text-sm mt-0.5">
            {loading ? 'Cargando...' : `${filtered.length} productos`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Subcategory pills */}
        {!subcat && (
          <div className="flex flex-wrap gap-2 mb-6">
            {subcats.map(c => (
              <button
                key={c.id}
                onClick={() => set('sub', c.name)}
                className="px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 bg-white text-j-steel hover:border-j-orange hover:text-j-orange transition-all"
              >
                {CAT_LABELS[c.name] ?? c.name}
              </button>
            ))}
          </div>
        )}

        {/* Dimension filters */}
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-5 flex flex-wrap items-center gap-3">
          <span className="text-[11px] font-black text-j-steel uppercase tracking-widest">Medida</span>

          <DimSelect label="Ancho"  value={ancho}  options={anchos}  onChange={v => set('ancho',  v)} />
          <DimSelect label="Perfil" value={perfil} options={perfiles} onChange={v => set('perfil', v)} />
          <DimSelect label="RIN"    value={rin}    options={rines}   onChange={v => set('rin',    v)} />

          {/* Search */}
          <div className="flex-1 min-w-[160px] relative">
            <input
              value={q}
              onChange={e => set('q', e.target.value)}
              placeholder="Marca, modelo, SKU..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-j-orange"
            />
            {q && (
              <button onClick={() => set('q','')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={13} />
              </button>
            )}
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-j-steel hover:text-j-red flex items-center gap-1 transition-colors"
            >
              <X size={12} /> Limpiar
            </button>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({length: 8}).map((_,i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 animate-pulse">
                <div className="h-52 bg-gray-100 rounded-t-2xl" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-4 bg-gray-100 rounded w-4/5" />
                  <div className="h-9 bg-gray-100 rounded mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-j-black font-bold text-lg mb-2">Sin resultados para esa medida.</p>
            <p className="text-j-steel text-sm mb-6">Pregunta por WhatsApp, puede que la tengamos.</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, busco una llanta y no la encuentro en su catálogo. ¿Me pueden ayudar?')}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-j-red text-white font-bold px-6 py-3 rounded-lg"
            >
              <MessageCircle size={16} /> Consultar por WhatsApp
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {paged.map(p => <LlantaCard key={p.sku} product={p} />)}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  disabled={page <= 1}
                  onClick={() => set('page', String(page-1))}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-30 hover:border-j-orange transition-colors"
                >
                  ‹ Anterior
                </button>
                <span className="text-sm text-j-steel px-3">{page} / {totalPages}</span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => set('page', String(page+1))}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-30 hover:border-j-orange transition-colors"
                >
                  Siguiente ›
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MessageCircle, ChevronRight, X, ZoomIn } from 'lucide-react'
import { getCatalogItemBySlug } from '../data/publicCatalog'
import { WHATSAPP_NUMBER } from '../config'

export default function CatalogoDetailPage() {
  const { categorySlug = '', itemSlug = '' } = useParams()
  const item = getCatalogItemBySlug(categorySlug, itemSlug)
  const [lightbox, setLightbox] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (lightbox) {
      requestAnimationFrame(() => setVisible(true))
      document.body.style.overflow = 'hidden'
    } else {
      setVisible(false)
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!item) {
    return (
      <div className="bg-j-gray min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-j-black font-bold text-lg mb-2">Página no encontrada.</p>
          <Link to="/catalogo" className="text-j-orange hover:text-j-red text-sm font-medium transition-colors">
            Ver catálogo
          </Link>
        </div>
      </div>
    )
  }

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(item.quotePrompt)}`

  return (
    <div className="bg-j-gray min-h-screen">

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 cursor-zoom-out"
          style={{
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}
          onClick={() => setLightbox(false)}
        >
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            style={{
              filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.6))',
              transform: visible ? 'scale(1)' : 'scale(0.82)',
              transition: 'transform 0.38s cubic-bezier(0.34,1.2,0.64,1), opacity 0.3s ease',
              opacity: visible ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X size={28} />
          </button>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-j-steel flex-wrap">
            <Link to="/" className="hover:text-j-black transition-colors">Inicio</Link>
            <ChevronRight size={12} className="flex-shrink-0" />
            <Link to="/catalogo" className="hover:text-j-black transition-colors">Catálogo</Link>
            <ChevronRight size={12} className="flex-shrink-0" />
            <Link
              to={`/catalogo?categoria=${encodeURIComponent(item.category)}`}
              className="hover:text-j-black transition-colors"
            >
              {item.category}
            </Link>
            <ChevronRight size={12} className="flex-shrink-0" />
            <span className="text-j-black font-medium">{item.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Image panel */}
          <div
            className="relative rounded-2xl overflow-hidden min-h-[340px] flex items-center justify-center"
            style={{ background: 'radial-gradient(ellipse at center, #dedad6 0%, #b8b3ae 100%)' }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(-45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 36px)',
              }}
            />
            {item.image ? (
              <button
                onClick={() => setLightbox(true)}
                className="group relative z-10 flex items-center justify-center cursor-zoom-in focus:outline-none"
                aria-label="Ver imagen ampliada"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-64 max-w-[78%] object-contain transition-transform duration-300 group-hover:scale-105"
                  style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.18))' }}
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <span
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 text-black/40 text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <ZoomIn size={13} />
                  Ampliar
                </span>
              </button>
            ) : (
              <span className="text-black/10 text-9xl font-black select-none z-10">{item.category[0]}</span>
            )}
            {item.sku && (
              <div className="absolute bottom-4 left-4 z-20">
                <span
                  className="text-black/40 text-xs font-mono px-3 py-1.5 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.08)' }}
                >
                  SKU: {item.sku}
                </span>
              </div>
            )}
          </div>

          {/* Info panel */}
          <div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Link
                to={`/catalogo?categoria=${encodeURIComponent(item.category)}`}
                className="inline-block bg-j-gray border border-gray-200 text-j-steel text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded hover:border-j-orange hover:text-j-orange transition-colors"
              >
                {item.category}
              </Link>
              {item.brand && (
                <span className="text-j-steel text-xs">{item.brand}</span>
              )}
            </div>

            <h1 className="text-3xl font-black text-j-black mb-2 leading-tight">
              {item.detailTitle}
            </h1>
            {item.sku && (
              <p className="text-j-steel/60 text-sm font-mono mb-4">SKU: {item.sku}</p>
            )}

            <p className="text-j-steel text-base leading-relaxed mb-6">
              {item.detailDescription}
            </p>

            <p className="text-j-steel/60 text-sm mb-8 border-l-2 border-j-gray pl-3">
              Disponibilidad sujeta a inventario. Pregunta por aplicación de vehículo.
            </p>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-j-red hover:bg-j-red-deep text-white font-bold px-6 py-3.5 rounded transition-colors text-base"
            >
              <MessageCircle size={18} />
              Cotizar por WhatsApp
            </a>

            <p className="text-j-steel/50 text-xs mt-4">
              Puedes enviar el número de parte, medida o una foto de la refacción.
            </p>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                to="/catalogo"
                className="text-j-steel hover:text-j-black text-sm font-medium transition-colors"
              >
                ← Volver a categorías
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

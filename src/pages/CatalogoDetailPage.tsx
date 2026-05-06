import { useParams, Link } from 'react-router-dom'
import { MessageCircle, ChevronRight } from 'lucide-react'
import { getCatalogItemBySlug } from '../data/publicCatalog'
import { WHATSAPP_NUMBER } from '../config'

export default function CatalogoDetailPage() {
  const { categorySlug = '', itemSlug = '' } = useParams()
  const item = getCatalogItemBySlug(categorySlug, itemSlug)

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
          <div className="bg-white border border-gray-200 rounded-xl flex items-center justify-center p-10 min-h-[280px]">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="max-h-56 max-w-full object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            ) : (
              <span className="text-j-steel/20 text-8xl font-black">{item.category[0]}</span>
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

            <h1 className="text-3xl font-black text-j-black mb-4 leading-tight">
              {item.detailTitle}
            </h1>

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

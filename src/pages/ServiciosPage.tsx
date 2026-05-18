import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, ChevronRight } from 'lucide-react'
import { SHOP_SERVICES } from '../data/services'
import { ServiceFeatureBlock } from '../components/ServiceFeatureBlock'
import { WHATSAPP_NUMBER } from '../config'

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hola, quiero cotizar un servicio en Refacciones y Llantas Jaime.'
)}`

const PAGE_TITLE       = 'Servicios automotrices en Maravatío | Refacciones y Llantas Jaime'
const PAGE_DESCRIPTION = 'Venta e instalación de llantas, reparación de mangueras hidráulicas, cambio de baleros, bujes y rótulas, y rectificación de discos, tambores y volantas en Maravatío, Michoacán.'
const ROOT_TITLE       = 'Refacciones y Llantas Jaime | Maravatío, Michoacán'
const ROOT_DESCRIPTION = 'Refacciones, llantas y autopartes en Maravatío, Michoacán. Cotiza por WhatsApp, número de parte, marca o medida. Servicio ligero y pesado.'

export default function ServiciosPage() {
  useEffect(() => {
    document.title = PAGE_TITLE
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (meta) meta.content = PAGE_DESCRIPTION
    return () => {
      document.title = ROOT_TITLE
      if (meta) meta.content = ROOT_DESCRIPTION
    }
  }, [])

  return (
    <div className="bg-white min-h-screen">

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-j-steel flex-wrap">
            <Link to="/" className="hover:text-j-black transition-colors">Inicio</Link>
            <ChevronRight size={12} className="flex-shrink-0" />
            <span className="text-j-black font-medium">Servicios</span>
          </nav>
        </div>
      </div>

      {/* ── Intro ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-2">
        <p className="text-j-red text-[10px] font-black tracking-[0.28em] uppercase mb-3">
          Servicios
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-j-black uppercase tracking-tight leading-tight mb-4">
          Servicios para mantener<br className="hidden sm:block" /> tu vehículo trabajando
        </h1>
        <p className="text-j-steel text-base leading-relaxed max-w-2xl">
          Además de refacciones y llantas, ofrecemos servicios especializados para autos,
          camionetas, tractocamiones, maquinaria y aplicaciones industriales.
        </p>
      </div>

      {/* ── Service blocks ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {SHOP_SERVICES.map((svc, i) => (
          <ServiceFeatureBlock key={svc.title} {...svc} index={i} />
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="bg-j-black mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <p className="text-white font-black text-xl leading-tight mb-1">
              ¿Necesitas un servicio?
            </p>
            <p className="text-white/60 text-sm leading-relaxed max-w-lg">
              Mándanos un mensaje con el servicio que necesitas, la marca y modelo de tu vehículo o equipo, y te damos una cotización rápida.
            </p>
          </div>
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-j-red hover:bg-j-red-deep text-white font-bold px-6 py-3 rounded-xl transition-colors flex-shrink-0 text-sm"
          >
            <MessageCircle size={17} />
            Cotizar por WhatsApp
          </a>
        </div>
      </div>

    </div>
  )
}

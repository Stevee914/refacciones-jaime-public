import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, ChevronRight } from 'lucide-react'
import { SHOP_SERVICES } from '../data/services'
import { ServiceCard } from '../components/ServiceCard'
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
    <div className="bg-j-gray min-h-screen">

      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-j-steel flex-wrap">
            <Link to="/" className="hover:text-j-black transition-colors">Inicio</Link>
            <ChevronRight size={12} className="flex-shrink-0" />
            <span className="text-j-black font-medium">Servicios</span>
          </nav>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <p className="text-j-red text-[10px] font-black tracking-[0.28em] uppercase mb-4">
            Servicios
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-j-black uppercase tracking-tight leading-tight mb-4">
            Servicios automotrices<br className="hidden sm:block" /> y de trabajo pesado
          </h1>
          <p className="text-j-steel text-base leading-relaxed max-w-2xl">
            En Refacciones y Llantas Jaime te apoyamos con servicios clave para mantener tu auto,
            camioneta, tractocamión o equipo trabajando correctamente.
          </p>
        </div>
      </div>

      {/* ── Services grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {SHOP_SERVICES.map(svc => (
            <ServiceCard key={svc.title} {...svc} />
          ))}
        </div>

        {/* ── Full-width WhatsApp CTA ── */}
        <div className="bg-j-red rounded-2xl px-6 py-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex-1">
            <p className="text-white font-black text-lg leading-tight mb-1">
              ¿Necesitas un servicio?
            </p>
            <p className="text-white/75 text-sm leading-relaxed">
              Mándanos un mensaje con el servicio que necesitas, la marca y modelo de tu vehículo o equipo, y te damos una cotización.
            </p>
          </div>
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white text-j-red hover:bg-j-warm font-bold px-6 py-3 rounded-xl transition-colors flex-shrink-0 text-sm"
          >
            <MessageCircle size={17} />
            Cotizar por WhatsApp
          </a>
        </div>

      </div>
    </div>
  )
}

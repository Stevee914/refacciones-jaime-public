import { Link } from 'react-router-dom'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { SHOP_SERVICES } from '../data/services'
import { ServiceCard } from './ServiceCard'
import { WHATSAPP_NUMBER } from '../config'

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hola, quiero cotizar un servicio en Refacciones y Llantas Jaime.'
)}`

export default function ServicesSection() {
  return (
    <section id="servicios-taller" className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-j-red text-[10px] font-black tracking-[0.28em] uppercase mb-3">
            Servicios
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-j-black uppercase tracking-tight leading-tight mb-3">
            Servicios para mantener<br className="hidden sm:block" /> tu vehículo trabajando
          </h2>
          <p className="text-j-steel text-sm max-w-xl leading-relaxed">
            Además de refacciones y llantas, ofrecemos servicios especializados para autos,
            camionetas, tractocamiones y aplicaciones industriales.
          </p>
        </div>

        {/* Cards — 1 col mobile / 2 cols tablet / 4 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {SHOP_SERVICES.map(svc => (
            <ServiceCard key={svc.title} {...svc} />
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/servicios"
            className="inline-flex items-center justify-center gap-2 bg-j-black hover:bg-j-black/80 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Ver servicios <ArrowRight size={14} />
          </Link>
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-j-red hover:bg-j-red-deep text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            <MessageCircle size={15} />
            Cotizar por WhatsApp
          </a>
        </div>

      </div>
    </section>
  )
}

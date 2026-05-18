import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react'
import { SHOP_SERVICES } from '../data/services'
import { WHATSAPP_NUMBER, WHATSAPP_MSG_DEFAULT } from '../config'

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG_DEFAULT}`
const FEATURED = SHOP_SERVICES[0]

function FeaturedImage() {
  const [imgFailed, setImgFailed] = useState(false)
  const Icon = FEATURED.icon

  if (!FEATURED.image || imgFailed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
        <Icon size={64} className="text-gray-300" />
      </div>
    )
  }

  return (
    <img
      src={FEATURED.image}
      alt={FEATURED.title}
      className="w-full h-full object-contain rounded-2xl"
      onError={() => setImgFailed(true)}
    />
  )
}

export default function ServicesSection() {
  return (
    <section id="servicios-taller" className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-j-red text-[10px] font-black tracking-[0.28em] uppercase mb-3">
            Servicios
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-j-black uppercase tracking-tight leading-tight">
            Servicios para mantener<br className="hidden sm:block" /> tu vehículo trabajando
          </h2>
        </div>

        {/* Horizontal preview */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* Featured image — left */}
          <div className="w-full lg:w-[42%] flex-shrink-0">
            <div className="bg-gray-50 rounded-2xl overflow-hidden h-64 sm:h-72 lg:h-80 shadow-sm">
              <FeaturedImage />
            </div>
          </div>

          {/* Service list — right */}
          <div className="flex-1">
            <p className="text-j-steel text-sm leading-relaxed mb-7 max-w-md">
              Además de refacciones y llantas, ofrecemos servicios especializados
              para autos, camionetas, tractocamiones y maquinaria industrial.
            </p>

            <ul className="space-y-4 mb-8">
              {SHOP_SERVICES.map(svc => (
                <li key={svc.title} className="flex items-start gap-3">
                  <CheckCircle2 size={17} className="text-j-red flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-j-black font-semibold text-sm">{svc.title}</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {svc.chips.map(chip => (
                        <span
                          key={chip}
                          className="text-[10px] font-medium text-j-steel bg-gray-100 px-2 py-0.5 rounded-full"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

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

        </div>
      </div>
    </section>
  )
}

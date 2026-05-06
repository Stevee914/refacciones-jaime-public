import { MessageCircle, Phone } from 'lucide-react'
import { WHATSAPP_NUMBER, WHATSAPP_MSG_CTA, BUSINESS_PHONE } from '../config'

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG_CTA}`

export default function WhatsAppCTA() {
  return (
    <section className="relative bg-j-orange overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

          {/* Copy */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-2">
              ¿Necesitas una refacción?
            </h2>
            <p className="text-white/80 text-base max-w-xl leading-relaxed">
              Envíanos el número de parte, modelo de vehículo o una foto.
              Cotizamos y confirmamos disponibilidad por WhatsApp.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-j-warm text-j-orange font-black text-base px-7 py-4 rounded shadow-lg transition-colors"
            >
              <MessageCircle size={20} />
              Escribir por WhatsApp
            </a>
            <a
              href="tel:+524474782074"
              className="inline-flex items-center justify-center gap-2.5 bg-j-red hover:bg-j-red-deep text-white font-bold text-base px-7 py-4 rounded transition-colors"
            >
              <Phone size={20} />
              {BUSINESS_PHONE}
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

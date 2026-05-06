import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '../config'

const WA_MSG  = encodeURIComponent('Hola, quisiera información sobre productos Pro One. ¿Me pueden ayudar?')
const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MSG}`

export default function ProOneSection() {
  return (
    <section className="relative bg-j-graphite overflow-hidden">

      {/* Fine grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.07,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Radial red glow — right side */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '560px',
          height: '560px',
          background: 'radial-gradient(circle, rgba(225,37,27,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Background typography */}
      <div
        className="absolute inset-0 flex items-center justify-start pl-8 pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-white font-black uppercase tracking-widest whitespace-nowrap"
          style={{ fontSize: 'clamp(48px, 9vw, 120px)', opacity: 0.03 }}
        >
          CADENA DE REFACCIONES
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-5 gap-10 items-center">

          {/* ── Left: copy ── */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="inline-block bg-j-red/20 border border-j-red/30 text-j-red text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-4 self-start">
              Marca destacada
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-white leading-none mb-2 uppercase tracking-tight">
              Pro One
            </h2>
            <p className="text-white/50 text-sm font-semibold uppercase tracking-widest mb-4">
              Cadena de refacciones
            </p>
            <p className="text-white/70 text-base leading-relaxed mb-6 max-w-xs">
              Filtros, aceites, bujías, balatas y más. Pregunta por disponibilidad y aplicación para tu vehículo.
            </p>

            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-j-red hover:bg-j-red-deep text-white font-bold px-5 py-3 rounded transition-colors self-start"
            >
              <MessageCircle size={17} />
              Cotizar por WhatsApp
            </a>
          </div>

          {/* ── Right: floating logo ── */}
          <div className="lg:col-span-3 flex items-center justify-center">
            {/* Glow ring */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-64 h-64 rounded-full border border-white/8 animate-pulse-slow" />
              <div className="absolute w-48 h-48 rounded-full border border-j-red/20 animate-pulse-slow" style={{ animationDelay: '1.25s' }} />

              {/* Logo */}
              <div className="relative z-10 animate-float">
                <img
                  src="/brands/proone.png"
                  alt="Pro One"
                  className="max-h-48 max-w-xs object-contain drop-shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    const fb = e.currentTarget.nextElementSibling as HTMLElement | null
                    if (fb) fb.style.display = 'block'
                  }}
                />
                <span className="hidden text-white font-black text-4xl">Pro One</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

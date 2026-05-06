import { ChevronDown, MessageCircle, LayoutGrid } from 'lucide-react'
import { WHATSAPP_NUMBER, WHATSAPP_MSG_CTA } from '../config'

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG_CTA}`
const LOGO_SRC = '/brand/logo-refacciones-jaime.png'

const STATS = [
  { value: '30+',  label: 'Años de experiencia' },
  { value: '+30K', label: 'Productos en catálogo' },
  { value: 'Hoy',  label: 'Entrega rápida' },
]

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── Background ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-j-black">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Orange bloom — right */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-j-orange/8 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        {/* Red bloom — bottom left */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-j-red/6 rounded-full blur-[130px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />
        {/* Accent lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-j-orange/12 to-transparent"
            style={{ right: '22%' }}
          />
          <div
            className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-white/4 to-transparent"
            style={{ right: '44%' }}
          />
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="max-w-3xl">

          {/* Logo */}
          <div className="mb-10">
            <img
              src={LOGO_SRC}
              alt="Refacciones y Llantas Jaime"
              className="h-16 sm:h-20 w-auto object-contain"
              draggable={false}
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-j-orange/10 border border-j-orange/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-j-orange animate-pulse-slow" />
            <span className="text-j-orange text-[11px] font-bold tracking-[0.2em] uppercase">
              Especialistas en Refacciones
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] font-black leading-[0.88] tracking-tight text-white mb-7">
            TODO LO QUE<br />
            TU VEHÍCULO<br />
            <span className="text-j-orange">NECESITA.</span>
          </h1>

          {/* Sub */}
          <p className="text-j-steel text-lg sm:text-xl max-w-lg leading-relaxed mb-10">
            Más de 30 años surtiendo talleres y particulares en México.
            Catálogo de más de 30,000 refacciones, llantas y autopartes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-j-orange hover:bg-j-orange-accent text-white font-bold text-base px-7 py-4 rounded transition-all duration-150 shadow-lg shadow-j-orange/20 hover:shadow-j-orange/30 hover:-translate-y-0.5"
            >
              <MessageCircle size={19} />
              Pedir por WhatsApp
            </a>
            <a
              href="#catalogo"
              className="inline-flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/12 hover:border-white/25 text-white font-semibold text-base px-7 py-4 rounded transition-all duration-150"
            >
              <LayoutGrid size={19} />
              Ver Categorías
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/8 pt-8">
            {STATS.map(s => (
              <div key={s.label}>
                <div className="text-3xl sm:text-4xl font-black text-j-orange leading-none">{s.value}</div>
                <div className="text-j-steel text-sm mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll cue ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex justify-center pb-8 animate-bounce">
        <a href="#catalogo" aria-label="Ir a catálogo" className="text-j-steel/40 hover:text-j-steel transition-colors">
          <ChevronDown size={26} />
        </a>
      </div>
    </section>
  )
}

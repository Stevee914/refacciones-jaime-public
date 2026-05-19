import { MessageCircle, LayoutGrid } from 'lucide-react'
import { WHATSAPP_NUMBER, WHATSAPP_MSG_CTA } from '../config'

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG_CTA}`

const enter = (delay: number): React.CSSProperties => ({
  animation: 'hero-in 0.75s ease-out both',
  animationDelay: `${delay}ms`,
})

export default function PromoBanner() {
  return (
    <section className="relative bg-j-red overflow-hidden">

      {/*
        ── Layer 1: Facade image ──────────────────────────────────────────
        Two divs to separate concerns:
        • Outer: translateX(8%) shifts the whole image panel to the right.
          section overflow-hidden clips the excess — no layout change.
          Effect: the visible window moves rightward into the image, showing
          more of the centre-left of the building where the main sign lives.
        • Inner: carries the background-image + settle animation.
          Keeping the animation on a child avoids the inline-transform /
          animation-fill-mode conflict that would cancel one or the other.
      */}
      {/*
        ── Mobile: fachada full-bleed + top→bottom gradient ──────────────
        Visible only below lg. Image covers the full section; the gradient
        keeps the red brand colour strong at the top (text area) and fades
        to a lighter tint at the bottom so the building reads through.
      */}
      <div className="lg:hidden absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:    "url('/brands/fachada.png')",
            backgroundSize:     'cover',
            backgroundPosition: 'center 30%',
            backgroundRepeat:   'no-repeat',
            opacity: 0.9,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(180,0,0,0.88) 0%, rgba(180,0,0,0.72) 45%, rgba(100,0,0,0.45) 100%)',
          }}
        />
      </div>

      {/*
        ── Desktop Layer 1: Facade image ─────────────────────────────────
      */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none"
        style={{ transform: 'translateX(8%)' }}
      >
        <div
          className="absolute inset-0 animate-hero-img-settle"
          style={{
            backgroundImage:    "url('/brands/fachada.png')",
            backgroundSize:     'auto 100%',
            backgroundRepeat:   'no-repeat',
            backgroundPosition: 'right center',
            opacity: 0.92,
          }}
        />
      </div>

      {/*
        ── Desktop Layer 2: Left→right gradient ──────────────────────────
      */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none"
        style={{
          background: [
            'linear-gradient(90deg,',
            '  #E1251B          0%,',
            '  #E1251B         42%,',
            '  rgba(225,37,27,0.82) 56%,',
            '  rgba(225,37,27,0.35) 70%,',
            '  rgba(225,37,27,0.08) 84%,',
            '  rgba(225,37,27,0.00) 100%',
            ')',
          ].join(''),
        }}
      />

      {/*
        ── Layer 3: Bottom dark fade ──────────────────────────────────────
        Visually blends the hero bottom into the dark graphite strip below.
        Keeps the section join clean and premium.
      */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.26) 100%)',
        }}
      />

      {/*
        ── Layer 4: Grid noise ───────────────────────────────────────────
        Subtle texture that spans the full hero. Keeps the red area from
        looking flat and lifeless.
      */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Text content ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* Location badge */}
        <div
          className="inline-flex items-center gap-2 bg-black/20 rounded-full px-3.5 py-1 mb-5"
          style={enter(0)}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse-slow" />
          <span className="text-white/80 text-[11px] font-bold tracking-[0.15em] uppercase">
            Maravatío, Michoacán
          </span>
        </div>

        <h1
          className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white leading-tight mb-4 uppercase tracking-tight"
          style={enter(80)}
        >
          Encuentra la refacción<br />
          y llanta que necesitas
        </h1>

        <p
          className="text-white/60 text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase mb-3"
          style={enter(160)}
        >
          Auto&nbsp;&nbsp;·&nbsp;&nbsp;Camioneta&nbsp;&nbsp;·&nbsp;&nbsp;Tractocamión&nbsp;&nbsp;·&nbsp;&nbsp;Agrícola
        </p>

        <p
          className="text-white/75 text-sm sm:text-base max-w-md leading-relaxed mb-8"
          style={enter(220)}
        >
          Busca por número de parte, marca, medida o aplicación.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-3"
          style={enter(300)}
        >
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-j-warm text-j-red font-black text-base px-6 py-3.5 rounded shadow-lg transition-colors"
          >
            <MessageCircle size={19} />
            Cotizar por WhatsApp
          </a>
          <a
            href="#categorias"
            className="inline-flex items-center justify-center gap-2.5 border-2 border-white/50 hover:border-white bg-transparent hover:bg-white/10 text-white font-bold text-base px-6 py-3.5 rounded transition-colors"
          >
            <LayoutGrid size={19} />
            Ver categorías
          </a>
        </div>

      </div>
    </section>
  )
}

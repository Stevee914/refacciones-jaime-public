import { useEffect, useRef } from 'react'
import { MessageCircle, Car, CircleDot, Truck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Strip {
  Icon: LucideIcon
  title: string
  sub: string
}

const ITEMS: Strip[] = [
  { Icon: MessageCircle, title: 'Cotización rápida',           sub: 'Respuesta inmediata por WhatsApp' },
  { Icon: Car,           title: 'Refacciones servicio ligero', sub: 'Frenos, suspensión, motor, clutch' },
  { Icon: CircleDot,     title: 'Llantas y accesorios',        sub: 'Todas las medidas y marcas' },
  { Icon: Truck,         title: 'Atención por WhatsApp',       sub: 'Tractocamión y servicio pesado' },
]

export default function ServicesStrip() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.animation = `card-in 0.6s ease-out ${el.dataset.delay}ms forwards`
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    cardRefs.current.forEach(el => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      // Cards already in the viewport on mount are left visible — no flash of black.
      // Only cards below the fold are hidden and revealed on scroll.
      if (rect.top < window.innerHeight) return
      el.style.opacity = '0'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-j-graphite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/8">
          {ITEMS.map(({ Icon, title, sub }, i) => (
            <div
              key={title}
              ref={el => { cardRefs.current[i] = el }}
              data-delay={i * 80}
              className="flex items-center gap-4 px-6 py-5"
            >
              <div className="w-10 h-10 rounded-full bg-j-red/25 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-j-red" />
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-snug">{title}</div>
                <div className="text-gray-400 text-xs mt-0.5 leading-snug">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

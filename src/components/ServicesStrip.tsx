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
  return (
    <section className="bg-j-graphite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* gap-px + bg-white/8 on grid = hairline separators between cells */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
          {ITEMS.map(({ Icon, title, sub }) => (
            <div
              key={title}
              className="bg-j-graphite flex items-center gap-3 px-4 py-4 lg:px-6 lg:py-5"
            >
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-j-red/25 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-j-red" />
              </div>
              <div className="min-w-0">
                <div className="text-white font-bold text-xs lg:text-sm leading-snug">{title}</div>
                <div className="text-gray-400 text-[11px] lg:text-xs mt-0.5 leading-snug">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

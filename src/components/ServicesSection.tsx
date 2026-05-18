import { useState } from 'react'
import { MessageCircle, CircleDot, Wrench, Settings, RotateCcw } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { WHATSAPP_NUMBER } from '../config'

interface ShopService {
  icon: LucideIcon
  title: string
  description: string
  image?: string  // e.g. "/services/llantas-instalacion.png" — falls back to icon when absent
}

const SHOP_SERVICES: ShopService[] = [
  {
    icon: CircleDot,
    title: 'Venta e instalación de llantas',
    description:
      'Llantas para auto, camioneta, tractocamión, agrícola e industrial, con apoyo para selección e instalación.',
    image: '/services/llantas-instalacion.png',
  },
  {
    icon: Wrench,
    title: 'Reparación de mangueras hidráulicas',
    description:
      'Servicio para mangueras hidráulicas automotrices e industriales, ideal para trabajo pesado y maquinaria.',
    image: '/services/mangueras-hidraulicas.png',
  },
  {
    icon: Settings,
    title: 'Cambio de baleros, bujes y rótulas',
    description:
      'Reemplazo de componentes de suspensión, dirección y rodamiento para mejorar seguridad y desempeño.',
    image: '/services/baleros-bujes-rotulas.png',
  },
  {
    icon: RotateCcw,
    title: 'Rectificación de discos, tambores y volantas',
    description:
      'Rectificación de discos y tambores de freno, además de volantas de clutch para un mejor asentamiento y funcionamiento.',
    image: '/services/rectificacion-discos.png',
  },
]

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hola, quiero cotizar un servicio en Refacciones y Llantas Jaime.'
)}`

// ── Single service card — handles image load/error state ──────────────────────

function ServiceCard({ icon: Icon, title, description, image }: ShopService) {
  const [imgFailed, setImgFailed] = useState(false)
  const showImage = !!image && !imgFailed

  return (
    <div className="group bg-white border border-gray-200 hover:border-j-red rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col">

      {/* Visual area */}
      <div className="relative flex-shrink-0">
        {/* Red top accent on hover */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-j-red opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10" />

        {showImage ? (
          <div className="h-44 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgFailed(true)}
            />
          </div>
        ) : (
          <div className="h-44 bg-j-gray flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-j-red/10 group-hover:bg-j-red/15 transition-colors duration-200 flex items-center justify-center">
              <Icon size={28} className="text-j-red" />
            </div>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="px-5 py-4 flex flex-col flex-1">
        <h3 className="text-j-black font-bold text-sm leading-snug mb-2">{title}</h3>
        <p className="text-j-steel text-xs leading-relaxed flex-1">{description}</p>
      </div>

    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function ServicesSection() {
  return (
    <section id="servicios-taller" className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-j-red text-[10px] font-black tracking-[0.28em] uppercase mb-3">
            Servicios
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-j-black uppercase tracking-tight leading-tight">
                Servicios para mantener
                <br className="hidden sm:block" />
                {' '}tu vehículo trabajando
              </h2>
              <p className="text-j-steel text-sm mt-3 max-w-xl leading-relaxed">
                Además de refacciones y llantas, ofrecemos servicios especializados para autos,
                camionetas, tractocamiones y aplicaciones industriales.
              </p>
            </div>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-j-red hover:bg-j-red-deep text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors flex-shrink-0 self-start sm:self-auto"
            >
              <MessageCircle size={15} />
              Cotizar servicio por WhatsApp
            </a>
          </div>
        </div>

        {/* Cards — 1 col mobile / 2 cols tablet / 4 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SHOP_SERVICES.map(svc => (
            <ServiceCard key={svc.title} {...svc} />
          ))}
        </div>

      </div>
    </section>
  )
}

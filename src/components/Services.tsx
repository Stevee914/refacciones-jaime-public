import { Users, Truck, BarChart3, ShieldCheck, Clock, MessageSquare } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Service {
  icon: LucideIcon
  title: string
  desc: string
}

const SERVICES: Service[] = [
  {
    icon: Users,
    title: 'Asesoría Técnica',
    desc: 'Nuestro equipo identifica la refacción correcta para tu vehículo, ya sea por número de parte, foto o descripción del problema.',
  },
  {
    icon: Truck,
    title: 'Entrega a Domicilio',
    desc: 'Servicio de entrega a talleres y clientes en la ciudad. Consulta cobertura y tiempos de entrega.',
  },
  {
    icon: BarChart3,
    title: 'Ventas al Mayoreo',
    desc: 'Precios especiales para talleres, flotilleros y distribuidores. Esquemas de crédito disponibles.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantía en Productos',
    desc: 'Todas nuestras refacciones cuentan con garantía de calidad. Solo manejamos marcas reconocidas.',
  },
  {
    icon: Clock,
    title: 'Atención Rápida',
    desc: 'Sin filas interminables ni burocracia. Mostrador ágil y respuesta inmediata por WhatsApp.',
  },
  {
    icon: MessageSquare,
    title: 'Pedidos por WhatsApp',
    desc: 'Envíanos número de parte, modelo de vehículo o foto. Cotizamos y confirmamos disponibilidad al instante.',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="bg-j-graphite py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
          <p className="text-j-orange text-[11px] font-bold tracking-[0.2em] uppercase mb-3">Servicios</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
            Más que una refaccionaria.
            <br />
            <span className="text-j-steel font-medium text-3xl lg:text-4xl">Tu aliado de taller.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-j-black/50 border border-white/8 hover:border-white/15 rounded-xl p-6 transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-j-orange/12 rounded-lg flex items-center justify-center mb-5">
                <Icon size={19} className="text-j-orange" />
              </div>
              <h3 className="text-white font-bold text-base mb-2">{title}</h3>
              <p className="text-j-steel text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

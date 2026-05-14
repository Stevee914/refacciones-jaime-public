import { BatteryCharging, Droplet, Truck, Wrench } from 'lucide-react'

interface Props {
  name: string
  size?: number
  className?: string
}

export function CategoryIcon({ name, size = 24, className = '' }: Props) {
  const svg = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  }

  switch (name) {

    // Tire: outer ring (tire) + rim + hub + 4 spokes
    case 'Llantas':
      return (
        <svg {...svg}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
          <line x1="12" y1="10.5" x2="12" y2="7" />
          <line x1="13.5" y1="12" x2="17" y2="12" />
          <line x1="12" y1="13.5" x2="12" y2="17" />
          <line x1="10.5" y1="12" x2="7" y2="12" />
        </svg>
      )

    // Brake disc: vented disc + center hole + 4 ventilation holes
    case 'Frenos':
      return (
        <svg {...svg}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="16.95" cy="7.05" r="1.3" />
          <circle cx="7.05" cy="7.05" r="1.3" />
          <circle cx="7.05" cy="16.95" r="1.3" />
          <circle cx="16.95" cy="16.95" r="1.3" />
        </svg>
      )

    // Oil filter canister: cylindrical body + collar + horizontal pleats
    case 'Filtros':
      return (
        <svg {...svg}>
          <rect x="7.5" y="6" width="9" height="14" rx="2" />
          <rect x="10" y="3" width="4" height="3.5" rx="1" />
          <line x1="7.5" y1="10" x2="16.5" y2="10" />
          <line x1="7.5" y1="13.5" x2="16.5" y2="13.5" />
          <line x1="7.5" y1="17" x2="16.5" y2="17" />
        </svg>
      )

    // Shock absorber: top mount + coil spring + damper rod + bottom mount
    case 'Suspensión':
      return (
        <svg {...svg}>
          <line x1="8.5" y1="1.5" x2="15.5" y2="1.5" />
          <line x1="12" y1="1.5" x2="12" y2="3.5" />
          <polyline points="12,3.5 7,5.5 17,8 7,10.5 17,13 7,15.5 12,17.5" />
          <line x1="12" y1="17.5" x2="12" y2="21.5" />
          <line x1="9" y1="21.5" x2="15" y2="21.5" />
        </svg>
      )

    // Ball bearing: outer race + inner race + 6 balls
    case 'Baleros':
      return (
        <svg {...svg}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="18.75" cy="12" r="1" />
          <circle cx="15.38" cy="17.85" r="1" />
          <circle cx="8.62" cy="17.85" r="1" />
          <circle cx="5.25" cy="12" r="1" />
          <circle cx="8.62" cy="6.15" r="1" />
          <circle cx="15.38" cy="6.15" r="1" />
        </svg>
      )

    // Clutch disc: outer ring + friction boundary + splined hub + 3 damper springs
    case 'Clutch':
      return (
        <svg {...svg}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5.5" />
          <circle cx="12" cy="12" r="2.5" />
          <circle cx="12" cy="8" r="1.2" />
          <circle cx="15.46" cy="14" r="1.2" />
          <circle cx="8.54" cy="14" r="1.2" />
        </svg>
      )

    // Serpentine belt: two pulleys + tangent belt lines
    case 'Bandas':
      return (
        <svg {...svg}>
          <circle cx="6.5" cy="13" r="4" />
          <circle cx="18" cy="9" r="3" />
          <line x1="5.19" y1="9.22" x2="17.02" y2="6.17" />
          <line x1="7.81" y1="16.78" x2="18.98" y2="11.83" />
        </svg>
      )

    case 'Baterías':
      return <BatteryCharging size={size} className={className} />

    case 'Aceites':
      return <Droplet size={size} className={className} />

    case 'Servicio pesado':
      return <Truck size={size} className={className} />

    case 'Herramientas':
      return <Wrench size={size} className={className} />

    // Spark plug: hex head + insulator body + center electrode + ground strap
    case 'Kits de afinación':
      return (
        <svg {...svg}>
          <path d="M9.5 2 L14.5 2 L16.5 6.5 L7.5 6.5 Z" />
          <rect x="10.5" y="6.5" width="3" height="7" rx="0.5" />
          <line x1="12" y1="13.5" x2="12" y2="18.5" />
          <path d="M12 18.5 L15 18.5 L15 15.5" />
        </svg>
      )

    default:
      return (
        <svg {...svg}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      )
  }
}

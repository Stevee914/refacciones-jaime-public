import { CircleDot, Wrench, Settings, RotateCcw } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface ShopService {
  icon: LucideIcon
  title: string
  description: string
  image?: string  // place file in /public/services/ — icon shown when absent
}

export const SHOP_SERVICES: ShopService[] = [
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
    image: '/brands/mangueras.png',
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
    image: '/services/rectificacion-discos-tambores.png',
  },
]

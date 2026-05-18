import { CircleDot, Wrench, Settings, RotateCcw } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface ShopService {
  icon: LucideIcon
  title: string
  description: string
  image?: string
  chips: string[]
  waMessage: string
}

export const SHOP_SERVICES: ShopService[] = [
  {
    icon: CircleDot,
    title: 'Montaje y balanceo de llantas',
    description:
      'Montaje y balanceo para auto y camioneta. Asesoría para elegir la medida y marca correcta.',
    image: '/brands/instalacion_llantas.png',
    chips: ['Auto', 'Camioneta'],
    waMessage: 'Hola, quiero cotizar montaje y balanceo de llantas.',
  },
  {
    icon: Wrench,
    title: 'Venta de conexiones y mangueras hidráulicas',
    description:
      'Mangueras hidráulicas nuevas a medida, con conexiones según aplicación. Servicio para maquinaria, trabajo pesado, uso automotriz e industrial.',
    image: '/brands/mangueras.png',
    chips: ['Mangueras a medida', 'Conexiones', 'Trabajo pesado', 'Industrial'],
    waMessage: 'Hola, quiero cotizar una manguera hidráulica o conexiones.',
  },
  {
    icon: Settings,
    title: 'Cambio de baleros, bujes y rótulas',
    description:
      'Reemplazo de componentes de suspensión, dirección y rodamiento para mejorar seguridad y desempeño.',
    image: '/brands/cambio_baleros.png',
    chips: ['Suspensión', 'Dirección', 'Rodamiento'],
    waMessage: 'Hola, quiero cotizar cambio de baleros, bujes o rótulas.',
  },
  {
    icon: RotateCcw,
    title: 'Rectificación de discos, tambores y volantas',
    description:
      'Rectificación de discos y tambores de freno, además de volantas de clutch para un mejor asentamiento y funcionamiento.',
    image: '/brands/rectificacion_discos.png',
    chips: ['Discos', 'Tambores', 'Volantas de clutch'],
    waMessage: 'Hola, quiero cotizar rectificación de discos, tambores o volantas.',
  },
]

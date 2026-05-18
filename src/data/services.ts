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
    title: 'Venta e instalación de llantas',
    description:
      'Llantas para auto, camioneta, tractocamión, agrícola e industrial, con apoyo para selección e instalación.',
    image: '/services/llantas-instalacion.png',
    chips: ['Auto', 'Camioneta', 'Tractocamión', 'Agrícola'],
    waMessage: 'Hola, quiero cotizar venta e instalación de llantas.',
  },
  {
    icon: Wrench,
    title: 'Reparación de mangueras hidráulicas',
    description:
      'Servicio para mangueras hidráulicas automotrices e industriales, ideal para trabajo pesado y maquinaria.',
    image: '/brands/mangueras.png',
    chips: ['Automotriz', 'Industrial', 'Trabajo pesado'],
    waMessage: 'Hola, quiero cotizar reparación de mangueras hidráulicas.',
  },
  {
    icon: Settings,
    title: 'Cambio de baleros, bujes y rótulas',
    description:
      'Reemplazo de componentes de suspensión, dirección y rodamiento para mejorar seguridad y desempeño.',
    image: '/services/baleros-bujes-rotulas.png',
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

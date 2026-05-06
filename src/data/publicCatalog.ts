export interface CatalogItem {
  id: string
  title: string
  category: string
  categorySlug: string
  brand?: string
  slug: string
  image?: string
  shortDescription: string
  detailTitle: string
  detailDescription: string
  quotePrompt: string
  tags: string[]
}

// ── Category tree ─────────────────────────────────────────────────────────────
// Defines parent categories that have subcategory drill-down pages.
// Categories NOT listed here fall through to the flat product list (current behaviour).
// Add children[] to any category to give it a landing page with subcategory cards.

export interface SubcategoryCard {
  name: string
  slug: string
  description: string
  image?: string           // optional; placeholder shown when absent
  quotePrompt: string      // pre-filled WhatsApp message for this subcategory
}

export interface CategoryNode {
  name: string             // must match CatalogItem.category exactly
  slug: string
  tagline?: string         // shown under the category title on the landing page
  searchHint?: string      // search-tip text shown on the landing page
  children?: SubcategoryCard[]
}

export const CATEGORY_TREE: CategoryNode[] = [
  {
    name: 'Llantas',
    slug: 'llantas',
    tagline: 'Llantas para auto, camioneta, tractocamión y agrícola.',
    searchHint: 'Busca por medida, marca o aplicación de tu vehículo.',
    children: [
      {
        name: 'Llanta auto',
        slug: 'llanta-auto',
        description: 'Llantas para autos compactos, sedanes y uso diario.',
        quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar llantas para auto. Medida: ',
      },
      {
        name: 'Llanta camión',
        slug: 'llanta-camion',
        description: 'Llantas para camión, carga y servicio pesado.',
        quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar llantas para camión. Medida: ',
      },
      {
        name: 'Llanta agrícola',
        slug: 'llanta-agricola',
        description: 'Medidas agrícolas para trabajo pesado y campo.',
        quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar llantas agrícolas. Medida o aplicación: ',
      },
      {
        name: 'Llanta moto',
        slug: 'llanta-moto',
        description: 'Llantas para motocicleta en diferentes medidas.',
        quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar llantas para moto. Medida: ',
      },
      {
        name: 'Llanta industrial',
        slug: 'llanta-industrial',
        description: 'Llantas para uso industrial y aplicaciones especiales.',
        quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar llantas industriales. Medida o aplicación: ',
      },
      {
        name: 'Llanta cuatri-moto',
        slug: 'llanta-cuatri-moto',
        description: 'Medidas para cuatrimoto y uso recreativo.',
        quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar llantas para cuatrimoto. Medida: ',
      },
      {
        name: 'Cámara y corbata',
        slug: 'camara-corbata',
        description: 'Cámaras, corbatas y accesorios para reparación.',
        quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar cámara o corbata para llanta.',
      },
    ],
  },
]

/** Returns the CategoryNode for a given category name, or undefined. */
export function getCategoryNode(name: string): CategoryNode | undefined {
  return CATEGORY_TREE.find(c => c.name === name)
}

// ── Catalog items ─────────────────────────────────────────────────────────────

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 'amortiguadores-boge',
    title: 'Amortiguadores Boge',
    category: 'Suspensión',
    categorySlug: 'suspension',
    brand: 'Boge',
    slug: 'amortiguadores-boge',
    image: '/brands/boge-logo.png',
    shortDescription: 'Amortiguadores para diferentes aplicaciones de auto, camioneta y servicio pesado.',
    detailTitle: 'Amortiguadores Boge',
    detailDescription: 'Amortiguadores para diferentes aplicaciones de auto, camioneta y servicio pesado. Pregunta por la aplicación de tu vehículo.',
    quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar amortiguadores Boge para mi vehículo.',
    tags: ['amortiguadores', 'suspensión', 'suspension', 'boge', 'shocks'],
  },
  {
    id: 'filtros-gonher',
    title: 'Filtros Gonher',
    category: 'Filtros',
    categorySlug: 'filtros',
    brand: 'Gonher',
    slug: 'gonher',
    image: '/brands/filtros-gonher.png',
    shortDescription: 'Filtros de aceite, aire, gasolina, diésel y servicio pesado.',
    detailTitle: 'Filtros Gonher',
    detailDescription: 'Filtros de aceite, aire, gasolina, diésel y servicio pesado. Disponibles para auto, camioneta, carga y tractocamión. Pregunta por disponibilidad y aplicación de vehículo.',
    quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar filtros Gonher.',
    tags: ['filtros', 'gonher', 'aceite', 'aire', 'gasolina', 'diesel', 'diésel', 'filter'],
  },
  {
    id: 'llantas-tornel',
    title: 'Llantas Tornel',
    category: 'Llantas',
    categorySlug: 'llantas',
    brand: 'Tornel',
    slug: 'tornel',
    image: '/brands/tornel-logo.png',
    shortDescription: 'Llantas para diferentes medidas de auto, camioneta, carga y tractocamión.',
    detailTitle: 'Llantas Tornel',
    detailDescription: 'Llantas para diferentes medidas de auto, camioneta, carga y tractocamión. Cotiza por medida o aplicación de vehículo.',
    quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar llantas Tornel.',
    tags: ['llantas', 'tornel', 'neumáticos', 'neumaticos', 'tires', 'medida'],
  },
  {
    id: 'balatas-fritec',
    title: 'Balatas Fritec',
    category: 'Frenos',
    categorySlug: 'frenos',
    brand: 'Fritec',
    slug: 'balatas-fritec',
    image: '/brands/fritec-balatas.jpg',
    shortDescription: 'Balatas para diferentes aplicaciones de auto y camioneta.',
    detailTitle: 'Balatas Fritec',
    detailDescription: 'Balatas de disco y tambor para diferentes aplicaciones de auto y camioneta. Pregunta por disponibilidad según la aplicación de tu vehículo.',
    quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar balatas Fritec.',
    tags: ['balatas', 'frenos', 'fritec', 'disco', 'tambor', 'brake', 'pastillas'],
  },
  {
    id: 'baterias-lth',
    title: 'Baterías LTH',
    category: 'Baterías',
    categorySlug: 'baterias',
    brand: 'LTH',
    slug: 'lth',
    image: '/brands/lth-bateria.png',
    shortDescription: 'Acumuladores para diferentes aplicaciones automotrices.',
    detailTitle: 'Baterías LTH',
    detailDescription: 'Acumuladores para diferentes aplicaciones automotrices. Pregunta por la batería adecuada para tu vehículo.',
    quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar una batería LTH.',
    tags: ['baterías', 'bateria', 'baterias', 'lth', 'acumulador', 'battery'],
  },
  {
    id: 'aceites-mobil-delvac',
    title: 'Aceites Mobil Delvac',
    category: 'Aceites',
    categorySlug: 'aceites',
    brand: 'Mobil',
    slug: 'mobil-delvac',
    image: '/brands/mobil-delvac.png',
    shortDescription: 'Lubricantes para aplicaciones diésel y servicio pesado.',
    detailTitle: 'Aceites Mobil Delvac',
    detailDescription: 'Lubricantes para aplicaciones diésel y servicio pesado. Pregunta por la viscosidad y especificación adecuada para tu vehículo.',
    quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar aceite Mobil Delvac.',
    tags: ['aceite', 'aceites', 'mobil', 'delvac', 'lubricante', 'diesel', 'diésel', 'pesado'],
  },
  {
    id: 'kits-afinacion',
    title: 'Kits de afinación',
    category: 'Kits de afinación',
    categorySlug: 'afinacion',
    slug: 'kits',
    image: '/brands/gonher-productos.png',
    shortDescription: 'Cotización de bujías, filtros y aceite según aplicación de vehículo.',
    detailTitle: 'Kits de afinación',
    detailDescription: 'Bujías, filtros y aceite según la aplicación de tu vehículo. Pregunta por disponibilidad y compatibilidad.',
    quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar un kit de afinación para mi vehículo.',
    tags: ['afinación', 'afinacion', 'bujías', 'bujias', 'filtros', 'aceite', 'kit', 'tune up', 'afinacion'],
  },
  {
    id: 'baleros-timken-ntn',
    title: 'Baleros Timken / NTN',
    category: 'Baleros',
    categorySlug: 'baleros',
    brand: 'Timken / NTN',
    slug: 'timken-ntn',
    shortDescription: 'Baleros para rueda, motor, chumaceras y aplicaciones industriales.',
    detailTitle: 'Baleros Timken / NTN',
    detailDescription: 'Baleros para rueda, motor, chumaceras y aplicaciones industriales. Cotiza por número de parte o medida.',
    quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar baleros.',
    tags: ['baleros', 'timken', 'ntn', 'bearing', 'rueda', 'chumacera', 'balero'],
  },
  {
    id: 'bandas-gates',
    title: 'Bandas Gates',
    category: 'Bandas',
    categorySlug: 'bandas',
    brand: 'Gates',
    slug: 'gates',
    shortDescription: 'Bandas de distribución, serpentín, poleas, tensores y kits.',
    detailTitle: 'Bandas Gates',
    detailDescription: 'Bandas de distribución, serpentín, poleas, tensores y kits. Pregunta por la aplicación de tu vehículo.',
    quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar bandas.',
    tags: ['bandas', 'gates', 'distribución', 'distribucion', 'serpentín', 'serpentin', 'tensor', 'polea', 'banda'],
  },
  {
    id: 'clutch-servicio-ligero',
    title: 'Clutch servicio ligero',
    category: 'Clutch',
    categorySlug: 'clutch',
    slug: 'servicio-ligero',
    shortDescription: 'Discos, prensas, collarines y kits completos para diferentes aplicaciones.',
    detailTitle: 'Clutch servicio ligero',
    detailDescription: 'Discos, prensas, collarines y kits completos para diferentes aplicaciones de auto y camioneta. Pregunta por la aplicación de tu vehículo.',
    quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar clutch para mi vehículo.',
    tags: ['clutch', 'embrague', 'disco', 'prensa', 'collarín', 'collarin', 'kit', 'cloch'],
  },
  {
    id: 'refacciones-servicio-pesado',
    title: 'Refacciones servicio pesado',
    category: 'Servicio pesado',
    categorySlug: 'servicio-pesado',
    slug: 'refacciones',
    shortDescription: 'Refacciones para carga, diésel, frenos de aire y transmisión.',
    detailTitle: 'Refacciones servicio pesado',
    detailDescription: 'Refacciones para carga, diésel, frenos de aire y transmisión. Pregunta por disponibilidad y número de parte.',
    quotePrompt: 'Hola, vengo de refaccionesjaime.com. Quiero cotizar refacciones de servicio pesado.',
    tags: ['servicio pesado', 'diesel', 'diésel', 'carga', 'frenos de aire', 'transmisión', 'transmision', 'tractocamion', 'tractocamión', 'pesado'],
  },
]

export const CURATED_CATEGORIES = [
  'Llantas',
  'Frenos',
  'Filtros',
  'Suspensión',
  'Baleros',
  'Clutch',
  'Bandas',
  'Baterías',
  'Aceites',
  'Kits de afinación',
  'Servicio pesado',
  'Herramientas',
]

export function searchCatalog(q: string): CatalogItem[] {
  const query = q.toLowerCase().trim()
  if (!query) return CATALOG_ITEMS
  return CATALOG_ITEMS.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.category.toLowerCase().includes(query) ||
    (item.brand?.toLowerCase().includes(query) ?? false) ||
    item.shortDescription.toLowerCase().includes(query) ||
    item.detailDescription.toLowerCase().includes(query) ||
    item.tags.some(t => t.toLowerCase().includes(query))
  )
}

export function getCatalogItemBySlug(categorySlug: string, itemSlug: string): CatalogItem | undefined {
  return CATALOG_ITEMS.find(
    item => item.categorySlug === categorySlug && item.slug === itemSlug
  )
}

export function getCatalogByCategory(category: string): CatalogItem[] {
  return CATALOG_ITEMS.filter(item => item.category === category)
}

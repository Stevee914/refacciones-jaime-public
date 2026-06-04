export interface LlantaProduct {
  sku: string
  name: string
  marca: string | null
  categoria_id: number
  cat_name: string | null
  imagen_url: string | null
  dim?: { ancho?: string; perfil?: string; rin?: string }
}

export interface LlantaCategory {
  id: number
  name: string
  parent_id: number | null
}

interface CatalogJson {
  generated_at: string
  categories: LlantaCategory[]
  products: LlantaProduct[]
  total: number
}

let _cache: CatalogJson | null = null

export async function loadLlantas(): Promise<CatalogJson> {
  if (_cache) return _cache
  const res = await fetch('/llantas.json')
  _cache = await res.json()
  return _cache!
}

export function cleanName(name: string, marca: string | null): string {
  // Remove "Llanta " prefix and return rest
  return name.replace(/^llanta\s+/i, '').trim()
}

export function buildWhatsAppMsg(product: LlantaProduct): string {
  const dim = product.dim
  const medida = dim
    ? [dim.ancho, dim.perfil ? `/${dim.perfil}` : '', dim.rin ? `R${dim.rin}` : ''].join('')
    : ''
  return encodeURIComponent(
    `Hola, vengo de refaccionesjaime.com. Quiero cotizar:\n` +
    `Llanta ${medida} ${product.marca ?? ''} - ${cleanName(product.name, product.marca)}\n` +
    `SKU: ${product.sku}`
  )
}

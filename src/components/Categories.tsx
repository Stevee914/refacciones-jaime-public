import { Link } from 'react-router-dom'
import { getCatalogByCategory, getCategoryNode } from '../data/publicCatalog'
import { CategoryIcon } from './CategoryIcons'

interface Category {
  name: string
  desc: string
  img?: string
}

const CATEGORIES: Category[] = [
  { name: 'Llantas',          desc: 'Todas las medidas para auto, camioneta, carga y tractocamión.',    img: '/brands/llantas.png' },
  { name: 'Frenos',           desc: 'Balatas, discos, tambores, cilindros y componentes hidráulicos.',  img: '/brands/fritec.png' },
  { name: 'Filtros',          desc: 'Aceite, aire, gasolina, diésel y habitáculo.',                    img: '/brands/filtros-gonher.png' },
  { name: 'Suspensión',       desc: 'Amortiguadores, bases, rótulas, terminales y bujes.',             img: '/brands/suspension.png' },
  { name: 'Clutch',           desc: 'Discos, prensas, collarines y kits completos.',                   img: '/brands/clutch.png' },
  { name: 'Baleros',          desc: 'Baleros de rueda, motor, chumaceras y aplicaciones industriales.',img: '/brands/baleros.png' },
  { name: 'Bandas',           desc: 'Distribución, serpentín, poleas, tensores y kits.',               img: '/brands/bandas.png' },
  { name: 'Baterías',         desc: 'Acumuladores y soluciones eléctricas para tu vehículo.',          img: '/brands/baterias.png' },
  { name: 'Aceites',          desc: 'Lubricantes, aditivos y productos de mantenimiento.',             img: '/brands/mobil-delvac-cubeta.png' },
  { name: 'Herramientas',     desc: 'Herramienta general y especializada para taller.',                img: '/brands/herramientas.png' },
  { name: 'Servicio pesado',  desc: 'Refacciones para carga, diésel, frenos de aire y transmisión.',  img: '/brands/servicio_pesado.png' },
  { name: 'Kits de afinación',desc: 'Bujías, filtros y aceite según aplicación de vehículo.',         img: '/brands/gonher-productos.png' },
]

export default function Categories() {
  return (
    <section id="categorias" className="bg-j-gray py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-xl font-black text-j-black uppercase tracking-tight">Categorías</h2>
          <span className="text-j-steel text-sm">{CATEGORIES.length} departamentos</span>
        </div>

        {/* Grid — 2 / 3 / 4 cols */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map(({ name, desc, img }) => {
            const catNode  = getCategoryNode(name)
            const catItems = getCatalogByCategory(name)
            const to = catNode?.children?.length
              ? `/catalogo?categoria=${encodeURIComponent(name)}`
              : catItems.length === 1
                ? `/catalogo/${catItems[0].categorySlug}/${catItems[0].slug}`
                : `/catalogo?categoria=${encodeURIComponent(name)}`

            return (
              <Link
                key={name}
                to={to}
                title={desc}
                className="group bg-white border border-gray-200 hover:border-j-orange rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
              >
                {/* Image / icon area */}
                <div className="relative h-40 bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-6 py-5 flex-shrink-0 overflow-hidden">
                  {/* Top accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-j-orange opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                  {img ? (
                    <img
                      src={img}
                      alt={name}
                      className="max-h-[120px] max-w-[85%] object-contain scale-[1.05] group-hover:scale-[1.12] transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const fb = e.currentTarget.parentElement?.querySelector('.icon-fallback') as HTMLElement | null
                        if (fb) fb.style.removeProperty('display')
                      }}
                    />
                  ) : null}

                  <span
                    className="icon-fallback items-center justify-center"
                    style={{ display: img ? 'none' : 'flex' }}
                  >
                    <CategoryIcon
                      name={name}
                      size={52}
                      className="text-j-steel/30 group-hover:text-j-orange/60 transition-colors duration-200"
                    />
                  </span>
                </div>

                {/* Label */}
                <div className="border-t border-gray-100 px-4 py-3 text-center">
                  <span className="text-j-black font-bold text-sm sm:text-base leading-snug block">
                    {name}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <p className="text-center text-j-steel text-xs mt-7">
          Consulta disponibilidad por WhatsApp.
        </p>
      </div>
    </section>
  )
}

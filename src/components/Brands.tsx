// Clean logo images (not product photos)
const LOGO_BRANDS = [
  { name: 'Pro One', img: '/brands/proone.png' },
  { name: 'Gonher',  img: '/brands/gonher-logo.png' },
  { name: 'Boge',    img: '/brands/boge-logo.png' },
  { name: 'Tornel',  img: '/brands/tornel-logo.png' },
  { name: 'LTH',     img: '/brands/lth-bateria.png' },
]

// Brands without clean logo files — rendered as text pills
const TEXT_BRANDS = [
  'Mobil', 'Michelin', 'Timken', 'NTN', 'Gates',
  'Monroe', 'KYB', 'NGK', 'Bosch', 'Fritec', 'Quaker State',
]

export default function Brands() {
  return (
    <section className="bg-white border-b border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-j-black uppercase tracking-tight">
            Marcas que manejamos
          </h2>
          <p className="text-j-steel text-xs hidden sm:block">
            Disponibilidad sujeta a inventario.
          </p>
        </div>

        {/* Logo brand cards */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
          {LOGO_BRANDS.map(({ name, img }) => (
            <div
              key={name}
              className="bg-j-gray border border-gray-200 hover:border-j-orange rounded-lg h-16 flex items-center justify-center px-4 cursor-default transition-all duration-150 hover:shadow-sm"
            >
              <img
                src={img}
                alt={name}
                className="max-h-10 max-w-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  const label = e.currentTarget.nextElementSibling as HTMLElement | null
                  if (label) label.style.display = 'block'
                }}
              />
              {/* Text fallback if image fails */}
              <span
                className="text-j-black font-bold text-sm hidden"
              >
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Text pills for brands without logo files */}
        <div className="flex flex-wrap gap-2">
          {TEXT_BRANDS.map(brand => (
            <div
              key={brand}
              className="bg-j-gray border border-gray-200 hover:border-j-orange hover:bg-j-orange/5 px-4 py-1.5 rounded text-j-black hover:text-j-orange text-sm font-medium transition-all duration-150 cursor-default select-none"
            >
              {brand}
            </div>
          ))}
        </div>

        <p className="text-j-steel/60 text-xs mt-5">
          Entre muchas otras marcas nacionales e importadas.
        </p>
      </div>
    </section>
  )
}

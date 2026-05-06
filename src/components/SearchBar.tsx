import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronDown, Car, LayoutGrid } from 'lucide-react'

export default function SearchBar() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(query.trim())}`)
    } else {
      navigate('/catalogo')
    }
  }

  return (
    <div className="bg-j-graphite border-b border-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <form onSubmit={handleSearch} className="flex items-center gap-2">

          <button
            type="button"
            onClick={() => navigate('/catalogo')}
            className="hidden lg:flex items-center gap-2 bg-j-red hover:bg-j-red-deep text-white text-sm font-bold px-4 py-2.5 rounded transition-colors whitespace-nowrap flex-shrink-0"
          >
            <LayoutGrid size={14} />
            Todos los productos
            <ChevronDown size={13} />
          </button>

          <button
            type="button"
            className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/35 text-gray-200 text-sm font-medium px-3 py-2.5 rounded transition-colors whitespace-nowrap flex-shrink-0"
          >
            <Car size={14} className="text-gray-300" />
            Selecciona tu vehículo
            <ChevronDown size={12} className="text-gray-400" />
          </button>

          <div className="flex flex-1 min-w-0">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca refacciones, llantas, marcas o número de parte..."
              className="flex-1 min-w-0 border-0 rounded-l px-4 py-2.5 text-sm text-j-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-j-red bg-white"
            />
            <button
              type="submit"
              className="bg-j-red hover:bg-j-red-deep text-white px-4 py-2.5 rounded-r flex items-center gap-1.5 transition-colors flex-shrink-0"
            >
              <Search size={16} />
              <span className="hidden sm:inline text-sm font-bold">Buscar</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

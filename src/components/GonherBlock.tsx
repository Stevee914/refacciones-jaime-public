import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '../config'

const WA_MSG  = encodeURIComponent('Hola, quisiera cotizar filtros Gonher. ¿Me pueden ayudar?')
const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MSG}`

export default function GonherBlock() {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Image */}
          <div className="bg-j-gray rounded-xl h-52 flex items-center justify-center p-6 overflow-hidden">
            <img
              src="/brands/filtros-gonher.png"
              alt="Filtros Gonher"
              className="max-h-full max-w-full object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          </div>

          {/* Text */}
          <div>
            <div className="inline-block bg-j-red/10 text-j-red text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-3">
              Gonher
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-j-black mb-2 leading-tight">
              Filtros Gonher
            </h2>
            <p className="text-j-steel text-base leading-relaxed mb-6">
              Filtros de aceite, aire, gasolina y servicio pesado.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/catalogo/filtros/gonher"
                className="inline-flex items-center justify-center gap-2.5 bg-j-red hover:bg-j-red-deep text-white font-bold px-5 py-3 rounded transition-colors"
              >
                Ver línea Gonher
              </Link>
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border border-gray-300 hover:border-j-red text-j-steel hover:text-j-red font-bold px-5 py-3 rounded transition-colors"
              >
                <MessageCircle size={17} />
                Cotizar por WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

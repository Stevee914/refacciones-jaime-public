import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { WHATSAPP_NUMBER, WHATSAPP_MSG_DEFAULT, BUSINESS_PHONE } from '../config'

const LOGO_SRC = '/brand/logo-refacciones-jaime.png'
const WA_HREF  = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG_DEFAULT}`

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] lg:h-[72px]">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={LOGO_SRC}
              alt="Refacciones y Llantas Jaime"
              className="h-10 lg:h-14 w-auto object-contain"
              draggable={false}
            />
          </Link>

          {/* Center tagline — desktop only */}
          <p className="hidden lg:block text-center text-j-steel text-[13px] leading-snug">
            Refacciones, llantas y autopartes para auto,<br />
            camioneta y tractocamión
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Phone — desktop */}
            <div className="hidden lg:flex flex-col items-end mr-1">
              <span className="text-[10px] text-j-steel uppercase tracking-wider">Llámanos</span>
              <a
                href="tel:+524474782074"
                className="text-sm font-bold text-j-black hover:text-j-red transition-colors"
              >
                {BUSINESS_PHONE}
              </a>
            </div>

            {/* WhatsApp */}
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-j-red hover:bg-j-red-deep text-white text-sm font-bold px-3 sm:px-4 py-2 rounded transition-colors"
            >
              <Phone size={14} />
              WhatsApp
            </a>

            {/* Catálogo shortcut — mobile */}
            <Link
              to="/catalogo"
              className="sm:hidden text-j-steel hover:text-j-black text-sm border border-gray-300 hover:border-gray-400 px-3 py-2 rounded transition-colors font-medium"
            >
              Catálogo
            </Link>

            {/* Catálogo — desktop */}
            <Link
              to="/catalogo"
              className="hidden sm:block text-j-steel hover:text-j-black text-sm border border-gray-300 hover:border-gray-400 px-3 py-2 rounded transition-colors font-medium"
            >
              Catálogo
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}

import { useState, useEffect } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import { WHATSAPP_NUMBER, WHATSAPP_MSG_DEFAULT } from '../config'

const NAV_LINKS = [
  { label: 'Inicio',    href: '#inicio' },
  { label: 'Catálogo',  href: '#catalogo' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros',  href: '#nosotros' },
  { label: 'Contacto',  href: '#contacto' },
]

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG_DEFAULT}`
const LOGO_SRC = '/brand/logo-refacciones-jaime.png'

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-j-black/96 backdrop-blur-md border-b border-white/8 shadow-xl shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a href="#inicio" className="flex-shrink-0 flex items-center">
            <img
              src={LOGO_SRC}
              alt="Refacciones y Llantas Jaime"
              className="h-10 lg:h-14 w-auto object-contain"
              draggable={false}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-j-steel hover:text-j-white text-[13px] font-medium tracking-wider uppercase transition-colors duration-150"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-j-orange hover:bg-j-orange-accent text-white text-[13px] font-semibold px-4 py-2 rounded transition-colors duration-150"
            >
              <Phone size={14} />
              WhatsApp
            </a>
            <button
              className="lg:hidden p-1.5 text-j-steel hover:text-j-white transition-colors"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Abrir menú"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-j-graphite border-t border-white/8">
          <nav className="flex flex-col px-5 py-4 gap-0.5">
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-j-steel hover:text-j-white py-3 border-b border-white/5 text-sm font-medium uppercase tracking-wider transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 bg-j-orange hover:bg-j-orange-accent text-white py-3.5 rounded font-bold text-sm transition-colors"
            >
              <Phone size={16} />
              Contactar por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

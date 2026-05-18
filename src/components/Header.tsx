import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, Menu, X } from 'lucide-react'
import { BUSINESS_PHONE } from '../config'

const LOGO_SRC = '/brand/logo-refacciones-jaime.png'

const NAV_LINKS = [
  { label: 'Inicio',    to: '/',          exact: true  },
  { label: 'Catálogo',  to: '/catalogo',  exact: false },
  { label: 'Servicios', to: '/servicios', exact: false },
  { label: 'Contacto',  to: '/#contacto', exact: false },
]

function NavLink({ label, to, active }: { label: string; to: string; active: boolean }) {
  const isAnchor = to.includes('#')
  const cls = `text-sm font-medium transition-colors ${
    active
      ? 'text-j-red border-b-2 border-j-red pb-0.5'
      : 'text-j-steel hover:text-j-red'
  }`

  if (isAnchor) {
    return <a href={to} className={cls}>{label}</a>
  }
  return <Link to={to} className={cls}>{label}</Link>
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  function isActive(link: typeof NAV_LINKS[0]) {
    if (link.exact) return pathname === link.to
    if (link.to.includes('#')) return false
    return pathname.startsWith(link.to)
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] lg:h-[72px]">

          {/* Logo + business name */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link to="/">
              <img
                src={LOGO_SRC}
                alt="Refacciones y Llantas Jaime"
                className="h-10 lg:h-14 w-auto object-contain"
                draggable={false}
              />
            </Link>
            <div className="hidden lg:flex flex-col justify-center border-l border-gray-200 pl-4">
              <span className="text-[15px] font-semibold text-gray-800 leading-tight whitespace-nowrap">
                Refacciones y Llantas Jaime
              </span>
              <span className="text-[12px] text-j-steel leading-tight">
                S.A. de C.V.
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map(link => (
              <NavLink key={link.to} {...link} active={isActive(link)} />
            ))}
          </nav>

          {/* Desktop right: phone */}
          <div className="hidden sm:flex items-center">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-j-steel uppercase tracking-wider">Llámanos</span>
              <a
                href="tel:+524474782074"
                className="text-sm font-bold text-j-black hover:text-j-red transition-colors flex items-center gap-1"
              >
                <Phone size={13} className="text-j-steel" />
                {BUSINESS_PHONE}
              </a>
            </div>
          </div>

          {/* Mobile right: hamburger */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={() => setOpen(o => !o)}
              className="p-2 text-j-steel hover:text-j-black transition-colors"
              aria-label="Menú"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="sm:hidden border-t border-gray-200 bg-white px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(link => {
            const active = isActive(link)
            const cls = `block px-2 py-2.5 text-sm font-medium rounded transition-colors ${
              active ? 'text-j-red bg-red-50' : 'text-j-steel hover:text-j-black hover:bg-gray-50'
            }`
            const isAnchor = link.to.includes('#')
            return isAnchor
              ? <a key={link.to} href={link.to} className={cls} onClick={() => setOpen(false)}>{link.label}</a>
              : <Link key={link.to} to={link.to} className={cls} onClick={() => setOpen(false)}>{link.label}</Link>
          })}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <a
              href="tel:+524474782074"
              className="flex items-center gap-2 px-2 py-2 text-sm text-j-steel hover:text-j-black transition-colors"
            >
              <Phone size={14} />
              {BUSINESS_PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

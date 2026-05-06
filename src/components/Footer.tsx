import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MSG_DEFAULT,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS,
  BUSINESS_CITY,
  BUSINESS_PHONE,
  MAPS_HREF,
} from '../config'

const LOGO_SRC = '/brand/logo-refacciones-jaime.png'

const NAV_LINKS = [
  { label: 'Inicio',   to: '/' },
  { label: 'Catálogo', to: '/catalogo' },
]

const HOURS = [
  { days: 'Lunes – Viernes', time: '8:30 – 15:00  ·  16:00 – 18:30' },
  { days: 'Sábado',          time: '8:30 – 15:00' },
  { days: 'Domingo',         time: 'Cerrado' },
]

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG_DEFAULT}`

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contacto" className="bg-j-graphite border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-5">
              <img
                src={LOGO_SRC}
                alt="Refacciones y Llantas Jaime"
                className="h-12 w-auto object-contain"
                draggable={false}
              />
            </Link>
            <p className="text-j-steel text-sm leading-relaxed">
              Especialistas en refacciones automotrices, llantas y autopartes en Maravatío, Michoacán.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.18em] mb-5">Navegación</h4>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-j-steel hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="#contacto" className="text-j-steel hover:text-white text-sm transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.18em] mb-5">Contacto</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-j-red mt-0.5 flex-shrink-0" />
                <a
                  href={MAPS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-j-steel hover:text-white text-sm leading-relaxed transition-colors"
                >
                  {BUSINESS_ADDRESS}<br />{BUSINESS_CITY}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-j-red flex-shrink-0" />
                <a
                  href="tel:+524474782074"
                  className="text-j-steel hover:text-white text-sm transition-colors"
                >
                  {BUSINESS_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-j-red flex-shrink-0 opacity-0" />
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-j-steel hover:text-white text-sm transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-j-red flex-shrink-0" />
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="text-j-steel hover:text-white text-sm transition-colors break-all"
                >
                  {BUSINESS_EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.18em] mb-5">Horarios</h4>
            <ul className="flex flex-col gap-4">
              {HOURS.map(h => (
                <li key={h.days} className="flex items-start gap-3">
                  <Clock size={14} className="text-j-red mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-white text-sm font-medium">{h.days}</div>
                    <div className="text-j-steel text-sm">{h.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-j-steel/50 text-xs">
            © {year} Refacciones y Llantas Jaime S.A. de C.V. Todos los derechos reservados.
          </p>
          <p className="text-j-steel/30 text-xs">refaccionesjaime.com</p>
        </div>
      </div>
    </footer>
  )
}

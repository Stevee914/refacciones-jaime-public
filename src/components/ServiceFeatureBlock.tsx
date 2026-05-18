import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import type { ShopService } from '../data/services'
import { WHATSAPP_NUMBER } from '../config'

interface Props extends ShopService {
  index: number
}

export function ServiceFeatureBlock({ icon: Icon, title, description, image, chips, waMessage, index }: Props) {
  const [imgFailed, setImgFailed] = useState(false)
  const showImage = !!image && !imgFailed
  const reversed = index % 2 !== 0
  const num = String(index + 1).padStart(2, '0')
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`

  const imageArea = (
    <div className="w-full lg:w-[48%] flex-shrink-0">
      <div className="relative rounded-2xl overflow-hidden bg-gray-50 shadow-sm">
        {showImage ? (
          <img
            src={image}
            alt={title}
            className="w-full h-64 sm:h-72 lg:h-80 object-contain group-hover:scale-[1.03] transition-transform duration-500"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-64 sm:h-72 lg:h-80 flex items-center justify-center bg-gray-100">
            <Icon size={56} className="text-gray-300" />
          </div>
        )}
      </div>
    </div>
  )

  const textArea = (
    <div className="flex-1 flex flex-col justify-center">
      {/* Number + accent */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[11px] font-black tracking-[0.25em] text-j-red">{num}</span>
        <div className="h-px flex-1 max-w-[48px] bg-j-red" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-j-black leading-tight tracking-tight mb-4">
        {title}
      </h2>

      <p className="text-j-steel text-base leading-relaxed mb-6 max-w-md">
        {description}
      </p>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {chips.map(chip => (
          <span
            key={chip}
            className="text-xs font-semibold text-j-black bg-gray-100 border border-gray-200 px-3 py-1 rounded-full"
          >
            {chip}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-j-red hover:bg-j-red-deep text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors"
        >
          <MessageCircle size={16} />
          Cotizar servicio
        </a>
      </div>
    </div>
  )

  return (
    <div className="group py-10 lg:py-14 border-b border-gray-100 last:border-b-0">
      <div
        className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
          reversed ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {imageArea}
        {textArea}
      </div>
    </div>
  )
}

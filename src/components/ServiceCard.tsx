import { useState } from 'react'
import type { ShopService } from '../data/services'

export function ServiceCard({ icon: Icon, title, description, image }: ShopService) {
  const [imgFailed, setImgFailed] = useState(false)
  const showImage = !!image && !imgFailed

  return (
    <div className="group bg-white border border-gray-200 hover:border-j-red rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col">

      {/* Visual area */}
      <div className="relative flex-shrink-0">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-j-red opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10" />
        {showImage ? (
          <div className="h-56 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgFailed(true)}
            />
          </div>
        ) : (
          <div className="h-56 bg-j-gray flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-j-red/10 group-hover:bg-j-red/15 transition-colors duration-200 flex items-center justify-center">
              <Icon size={32} className="text-j-red" />
            </div>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="px-6 py-5 flex flex-col flex-1">
        <h3 className="text-j-black font-bold text-base leading-snug mb-2">{title}</h3>
        <p className="text-j-steel text-sm leading-relaxed flex-1">{description}</p>
      </div>

    </div>
  )
}

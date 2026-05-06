const REASONS = [
  {
    num: '01',
    title: '+30 años en el mercado',
    desc: 'Tres décadas surtiendo talleres, flotas y particulares. Conocemos el mercado como nadie en la región.',
  },
  {
    num: '02',
    title: '+30,000 productos en almacén',
    desc: 'Catálogo amplio de refacciones nacionales e importadas. Si no lo tenemos, lo conseguimos.',
  },
  {
    num: '03',
    title: 'Especialistas en motriz',
    desc: 'Frenos, suspensión, motor, transmisión, clutch. Asesoría técnica real para identificar la pieza correcta.',
  },
  {
    num: '04',
    title: 'Precios de distribuidor',
    desc: 'Precios competitivos para talleres, flotilleros y clientes frecuentes. Pregunta por crédito y mayoreo.',
  },
]

export default function WhyUs() {
  return (
    <section id="nosotros" className="bg-j-black py-24 border-y border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left column — copy */}
          <div className="lg:sticky lg:top-28">
            <p className="text-j-orange text-[11px] font-bold tracking-[0.2em] uppercase mb-3">Por qué elegirnos</p>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              Refacciones Jaime.<br />
              <span className="text-j-steel font-medium text-3xl lg:text-4xl">
                Confianza que se hereda.
              </span>
            </h2>
            <p className="text-j-steel text-base leading-relaxed max-w-sm">
              Somos una empresa familiar con raíces profundas en el sector automotriz. Cada cliente recibe atención directa, sin intermediarios, con el respaldo de décadas de experiencia.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-[3px] w-12 bg-j-orange rounded-full" />
              <div className="h-[3px] w-4 bg-j-orange/30 rounded-full" />
            </div>
          </div>

          {/* Right column — reasons */}
          <div className="flex flex-col gap-10">
            {REASONS.map(({ num, title, desc }) => (
              <div key={num} className="flex gap-6 items-start group">
                <span className="text-[40px] font-black text-j-orange/20 group-hover:text-j-orange/40 leading-none transition-colors duration-300 select-none w-12 flex-shrink-0 text-right">
                  {num}
                </span>
                <div>
                  <h3 className="text-white font-bold text-base mb-1.5">{title}</h3>
                  <p className="text-j-steel text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

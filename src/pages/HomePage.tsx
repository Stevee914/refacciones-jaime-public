import PromoBanner from '../components/PromoBanner'
import ServicesStrip from '../components/ServicesStrip'
import Categories from '../components/Categories'
import ServicesSection from '../components/ServicesSection'
import ProOneSection from '../components/ProOneSection'
import GonherBlock from '../components/GonherBlock'
import Brands from '../components/Brands'
import WhatsAppCTA from '../components/WhatsAppCTA'

export default function HomePage() {
  return (
    <>
      <PromoBanner />
      <ServicesStrip />
      <Categories />
      <ServicesSection />
      <ProOneSection />
      <GonherBlock />
      <Brands />
      <WhatsAppCTA />
    </>
  )
}

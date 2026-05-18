import { Outlet } from 'react-router-dom'
import Header from './Header'
import SearchBar from './SearchBar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import FloatingWhatsApp from './FloatingWhatsApp'

export default function Layout() {
  return (
    <div className="min-h-screen bg-j-gray font-sans antialiased">
      <ScrollToTop />
      <div className="sticky top-0 z-40">
        <Header />
        <SearchBar />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

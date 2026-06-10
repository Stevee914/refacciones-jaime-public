import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CatalogoPage from './pages/CatalogoPage'
import CatalogoDetailPage from './pages/CatalogoDetailPage'
import ServiciosPage from './pages/ServiciosPage'
import LlantasPage from './pages/LlantasPage'
import ErrorBoundary from './components/ErrorBoundary'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'catalogo', element: <ErrorBoundary><CatalogoPage /></ErrorBoundary> },
      { path: 'catalogo/:categorySlug/:itemSlug', element: <ErrorBoundary><CatalogoDetailPage /></ErrorBoundary> },
      { path: 'llantas', element: <LlantasPage /> },
      { path: 'servicios', element: <ServiciosPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}

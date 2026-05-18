import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CatalogoPage from './pages/CatalogoPage'
import CatalogoDetailPage from './pages/CatalogoDetailPage'
import ServiciosPage from './pages/ServiciosPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'catalogo', element: <CatalogoPage /> },
      { path: 'catalogo/:categorySlug/:itemSlug', element: <CatalogoDetailPage /> },
      { path: 'servicios', element: <ServiciosPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}

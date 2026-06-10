import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch() {
    // Auto-reload once to recover from chunk/hydration errors
    const key = '__eb_reloaded__'
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1')
      window.location.reload()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-j-gray px-4">
          <p className="text-j-black font-semibold text-base">Ocurrió un error inesperado.</p>
          <button
            onClick={() => { sessionStorage.removeItem('__eb_reloaded__'); window.location.reload() }}
            className="bg-j-red text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
          >
            Recargar página
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={
      <div className="min-h-screen bg-dark-300 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Oops! Something went wrong</h1>
          <p className="text-white/80 mb-4">The application encountered an unexpected error.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-black rounded hover:bg-primary/80 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    }>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
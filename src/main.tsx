import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import './index.css'

// Mobile-specific error fallback
const MobileErrorFallback = () => (
  <div className="min-h-screen bg-dark-300 text-white flex items-center justify-center p-4">
    <div className="text-center max-w-md">
      <h1 className="text-2xl font-bold text-primary mb-4">Something went wrong</h1>
      <p className="text-white/80 mb-4">The application encountered an unexpected error.</p>
      <div className="space-y-3">
        <button
          onClick={() => window.location.reload()}
          className="w-full px-4 py-2 bg-primary text-black rounded hover:bg-primary/80 transition-colors font-medium"
        >
          Refresh Page
        </button>
        <button
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
          }}
          className="w-full px-4 py-2 bg-dark-200 border border-primary/30 text-primary rounded hover:bg-dark-100 transition-colors font-medium"
        >
          Clear Cache & Refresh
        </button>
      </div>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<MobileErrorFallback />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleRefresh = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="fixed inset-0 flex items-center justify-center bg-dark-300 text-white p-4">
          <div className="text-center max-w-md">
            <h2 className="text-xl font-bold mb-4 text-primary">Oops! Something went wrong</h2>
            <p className="text-sm opacity-80 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            
            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full px-4 py-2 bg-primary text-black rounded hover:bg-primary/80 transition-colors font-medium"
              >
                Try Again
              </button>
              
              <button
                onClick={this.handleRefresh}
                className="w-full px-4 py-2 bg-dark-200 border border-primary/30 text-primary rounded hover:bg-dark-100 transition-colors font-medium"
              >
                Refresh Page
              </button>
            </div>
            
            {import.meta.env.DEV && this.state.errorInfo && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-xs text-primary/60 hover:text-primary">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 text-xs bg-dark-200 p-2 rounded overflow-auto max-h-32">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    // Log to console in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">❤️</div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Something Went Wrong</h1>
            <p className="text-slate-600 mb-6">Your answers have been saved. Please try again.</p>
            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  sessionStorage.clear();
                  this.handleReset();
                  window.location.href = '/assess';
                }}
                className="flex-1 px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold rounded-lg transition"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

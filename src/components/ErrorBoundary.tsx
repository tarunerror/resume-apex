import React from 'react';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-500">
          Something went wrong. Please refresh the page.
        </div>
      );
    }

    return this.props.children;
  }
} 
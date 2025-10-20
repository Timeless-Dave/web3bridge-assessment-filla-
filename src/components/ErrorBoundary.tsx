'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the whole app
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console for debugging
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
          <Card className="max-w-md w-full text-center" padding="lg">
            {/* Error Icon */}
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-600">
                Don't worry, this happens sometimes. Let's get you back on track!
              </p>
            </div>

            {/* Error Details (development mode) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left overflow-auto max-h-40">
                <p className="text-xs font-mono text-red-600 mb-2">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={this.handleReset}
                fullWidth
                size="lg"
                leftIcon={<RotateCcw className="w-5 h-5" />}
              >
                Try Again
              </Button>
              
              <Button
                onClick={this.handleGoHome}
                fullWidth
                size="lg"
                variant="outline"
                leftIcon={<Home className="w-5 h-5" />}
              >
                Go to Home
              </Button>
            </div>

            {/* Helpful Tips */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-left">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">
                💡 Quick Tips:
              </h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Try refreshing the page</li>
                <li>• Check your internet connection</li>
                <li>• Clear your browser cache</li>
                <li>• Make sure JavaScript is enabled</li>
              </ul>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook-based error boundary wrapper for simpler usage
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}


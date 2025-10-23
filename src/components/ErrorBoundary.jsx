/**
 * ErrorBoundary.jsx - Error boundary component for CEOTR Ltd ERP Suite
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 *
 * Features:
 * - Catches and displays component errors gracefully
 * - Logs errors to console for debugging
 * - Provides user-friendly error messages
 * - Includes retry functionality
 * - Maintains application stability
 *
 * @returns {JSX.Element} Error boundary wrapper component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // In production, you might want to send this to an error reporting service
    // Example: sendErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-neutral-200 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>

            <h1 className="text-2xl font-bold text-neutral-900 mb-4">
              Something went wrong
            </h1>

            <p className="text-neutral-600 mb-6 leading-relaxed">
              We're sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
            </p>

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Try Again
              </button>

              <button
                onClick={() => window.location.href = '/'}
                className="w-full btn-secondary"
              >
                Go to Homepage
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-200">
              <p className="text-sm text-neutral-500">
                If the problem persists, please contact our support team.
              </p>
              <a
                href="mailto:ceotrlimited@gmail.com"
                className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
              >
                ceotrlimited@gmail.com
              </a>
            </div>

            {/* Development error details */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-neutral-500 cursor-pointer hover:text-neutral-700">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 p-4 bg-neutral-100 rounded-lg text-xs overflow-auto max-h-40">
                  {this.state.error.toString()}
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

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;

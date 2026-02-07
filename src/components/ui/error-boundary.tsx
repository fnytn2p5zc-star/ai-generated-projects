'use client'

import { Component, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  handleReset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <AlertTriangle className="h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">Something went wrong.</p>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

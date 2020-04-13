import React, { Component } from 'react'
import ErrorMessage from './ErrorMessage'


class ErrorBoundary extends Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    return this.state.hasError ? <ErrorMessage /> : this.props.children
  }
}

export default ErrorBoundary

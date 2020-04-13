import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'


ReactDOM.render(
  <Provider store={store}>
  <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'))

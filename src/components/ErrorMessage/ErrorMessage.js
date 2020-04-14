import React from 'react'
import PropTypes from 'prop-types'
import './ErrorMessage.css'


function ErrorMessage({ error }) {
  return (
    <div className="error-message">
      <h4 className="error-message__heading">Warning!</h4>
      <p className="error-message__text">{ error }. Try again later.</p>
    </div>
  )
}

ErrorMessage.propTypes = {
  error: PropTypes.string
}

ErrorMessage.defaultProps = {
  error: 'Something went wrong'
}

export default ErrorMessage

import React from 'react'
import PropTypes from 'prop-types'


function ErrorMessage({ error }) {
  return (
    <div className="alert alert-danger error-message">
      <h4 className="alert-heading">Warning!</h4>
      <p className="mb-0">{ error }. Try again later.</p>
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

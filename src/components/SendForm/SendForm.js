import React, { Component } from 'react'
import './SendForm.css'


class SendForm extends Component {

  inputEl = React.createRef()

  handleSendMessage = event => {
    event.preventDefault()
    const text = this.inputEl.current.value

    if (text.trim().length > 0) {
      this.inputEl.current.value = ''
      this.props.onSendMessage(text)
    }
  }

  render() {
    return (
      <form className="send-form">
        <input
            type="text"
            name="message"
            className="form-control"
            placeholder="Enter message"
            ref={ this.inputEl }
            autoComplete="off"
          />
        <button 
          type="submit" 
          className="btn btn--success"
          onClick={ this.handleSendMessage }
        >
          Send
        </button>
      </form>
    )
  }
}

export default SendForm

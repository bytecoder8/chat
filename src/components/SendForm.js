import React, { Component } from 'react'

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
            placeholder="Enter message"
            ref={ this.inputEl }
            autoComplete="off"
          />
        <input type="submit" onClick={ this.handleSendMessage } />
      </form>
    )
  }
}

export default SendForm

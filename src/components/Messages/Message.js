import React, { Component } from 'react'

class Message extends Component {
  render() {
    const { author, message } = this.props
    return (
      <div className="message">
        <span className="author">{author}</span>
        <span className="message">{message}</span>
      </div>
    )
  }
}

export default Message

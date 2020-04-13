import React, { Component } from 'react'

class Message extends Component {
  render() {
    const { author, text } = this.props
    return (
      <div className="message">
        <span className="author">{author}: </span>
        <span className="message">{text}</span>
      </div>
    )
  }
}

export default Message

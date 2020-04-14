import React, { Component } from 'react'
import Message from './Message'
import './Messages.css'


class Messages extends Component {
  render() {
    const { messages } = this.props

    return (
      <div className="messages">
        { messages.map((message, index) => (
          <Message key={index} {...message} />
        )) }
      </div>
    )
  }
}

export default Messages

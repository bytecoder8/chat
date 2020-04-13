import React, { Component } from 'react'
import Message from './Message'


class Messages extends Component {

  messages = [
    {id: 1, author: 'Author 1', message: 'Start'},
    {id: 2, author: 'Author 2', message: 'Between'},
    {id: 3, author: 'Author 1', message: 'End'}
  ]

  render() {
    return (
      <div className="messages">
        { this.messages.map(message => (
          <Message key={message.id} {...message} />
        )) }
      </div>
    )
  }
}

export default Messages

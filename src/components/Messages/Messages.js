import React, { Component } from 'react'
import Message from './Message'
import './Messages.css'


class Messages extends Component {

  messagesEnd = React.createRef()

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  render() {
    const { messages } = this.props

    return (
      <div className="messages">
        { messages.map((message, index) => (
          <Message key={index} {...message} />
        )) }
        <div ref={ this.messagesEnd }></div>
      </div>
    )
  }
}

export default Messages

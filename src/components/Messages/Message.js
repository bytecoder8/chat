import React, { Component } from 'react'
import dateFilter from '../../utils/dateFilter'


class Message extends Component {

  render() {
    const { author, text, time } = this.props
    return (
      <div className="message messages__message">
        <div className="message__meta">
          <div className="message__author">{ author }</div>
          <div className="message__time">{ dateFilter(time, 'time') }</div>
        </div>
        <div className="message__text">{ text }</div>
      </div>
    )
  }
}

export default Message

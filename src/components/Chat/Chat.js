import React, { useEffect, useState, useRef } from 'react'
import Messages from '../Messages'
import SendForm from '../SendForm'

const WS_URL = 'ws://localhost:8080'

let socket

const Chat = () => {
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState([])


  useEffect(() => {
    socket = new WebSocket(WS_URL)

    socket.onopen = () => {
      console.log('connection opened')
      setConnected(true)
    }

    return () => {
      socket.close()
      setConnected(false)
    }
  }, [])

  useEffect(() => {
    // message from server
    socket.onmessage = ({ data }) => {
      try {
        const message = JSON.parse(data)
        setMessages(messages => messages.concat(message))
      } catch (error) {
        console.error(error)
      }
    }
  }, [messages])

  const handleSendMessage = text => {
    if (socket) {
      socket.send(JSON.stringify({ 
        author: 'user',
        text
      }))
    }
  }

  return(
    <div className="chat">
      { connected &&
        <>
          <Messages messages={messages} />
          <SendForm onSendMessage={ (text) => handleSendMessage(text) } />
        </>
      }
    </div>
  )
}

export default Chat

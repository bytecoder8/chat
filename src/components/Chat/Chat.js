import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connectToServer, sendMessage } from '../../redux/actions'
import Messages from '../Messages'
import SendForm from '../SendForm'


const Chat = () => {
  const connected = useSelector(state => state.connected)
  const messages = useSelector(state => state.messages)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(connectToServer())
  }, [])


  const handleSendMessage = text => {
    dispatch(sendMessage(text))
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

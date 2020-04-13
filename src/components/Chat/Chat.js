import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connectToServer, sendMessage } from '../../redux/actions'
import Messages from '../Messages'
import SendForm from '../SendForm'
import UsernameForm from '../UsernameForm/UsernameForm'


const Chat = () => {
  const loading = useSelector(state => state.loading)
  const messages = useSelector(state => state.messages)
  const username = useSelector(state => state.username)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(connectToServer())
  }, [])

  const handleSendMessage = text => {
    dispatch(sendMessage(text))
  }

  if (loading) {
    return 'Loading...'
  }

  if (!username) {
    return <UsernameForm />
  }

  return(
    <div className="chat">
      <Messages messages={messages} />
      <SendForm onSendMessage={ (text) => handleSendMessage(text) } />
    </div>
  )
}

export default Chat

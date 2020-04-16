import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connectToServer, sendMessage, disconnectFromServer } from '../../redux/actions'
import Messages from '../Messages'
import SendForm from '../SendForm'
import UsernameForm from '../UsernameForm/UsernameForm'
import './Chat.css'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import UserList from '../UserList/UserList'


const Chat = () => {
  const loading = useSelector(state => state.loading)
  const messages = useSelector(state => state.messages)
  const username = useSelector(state => state.username)
  const error = useSelector(state => state.error)
  const connected = useSelector(state => state.connected)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(connectToServer())

    return () => {
      dispatch(disconnectFromServer())
    }
  }, [])

  const handleSendMessage = text => {
    dispatch(sendMessage(text))
  }

  if (loading) {
    return 'Loading...'
  }

  if (error) {
    return <ErrorMessage error={error.toString()} />
  }

  if (!connected) {
    return 'You disconnected'
  }

  if (!username) {
    return <UsernameForm />
  }

  return(
    <div className="chat">
      <div className="chat__left">
        <Messages messages={messages} />
        <SendForm onSendMessage={ (text) => handleSendMessage(text) } />
      </div>
      <div className="chat__right">
        <UserList />
        <button className="btn btn--success" onClick={ () => dispatch(disconnectFromServer()) }
        >Quit</button>
      </div>
    </div>
  )
}

export default Chat

import { START, SUCCESS, FAILURE, CONNECT, REQUEST, MESSAGE_RECEIVED } from './types'


const WS_URL = 'ws://localhost:8080'

export const connectionStarted = () => ({
  type: CONNECT + REQUEST
})

export const connectionError = error => ({
  type: CONNECT + FAILURE,
  payload: error
})

export const connectionSuccess = socket => ({
  type: CONNECT + SUCCESS,
  payload: socket
})

export const messageReceived = message => ({
  type: MESSAGE_RECEIVED,
  payload: message
})

export const connectToServer = () => {
  return dispatch => {
    dispatch(connectionStarted())

    const socket = new WebSocket(WS_URL)

    socket.onopen = () => {
      dispatch(connectionSuccess(socket))

      socket.onmessage = ({ data }) => {
        dispatch(messageReceived(data))
      }
    }

    socket.onerror = error => {
      console.log(error)
      dispatch(connectionError(error))
    }
  }
}

export const sendMessage = (text) => {
  return (dispatch, getState) => {
    const { socket } = getState() 
    socket.send(JSON.stringify({ 
      author: 'user',
      text
    }))
  }
}

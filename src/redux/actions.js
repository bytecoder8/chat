import { 
  SUCCESS,
  FAILURE,
  CONNECT,
  REQUEST,
  DATA_RECEIVED,
  FETCH_USERS,
  DISCONNECT
} from './types'


const WS_URL = 'ws://localhost:9090'

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

export const dataReceived = data => ({
  type: DATA_RECEIVED,
  payload: data
})


export const connectToServer = () => {
  return dispatch => {
    dispatch(connectionStarted())

    const socket = new WebSocket(WS_URL)

    socket.onopen = () => {
      dispatch(connectionSuccess(socket))

      socket.onmessage = ({ data }) => {
        dispatch(dataReceived(data))
      }
    }

    socket.onerror = error => {
      dispatch(connectionError('Error connecting to chat server'))
    }
  }
}

export const disconnectFromServer = () => {
  return (dispatch, getState) => {
    const { socket } = getState()

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'disconnect'
      }))
    }

    if (socket) {
      socket.close()
    }

    dispatch({
      type: DISCONNECT
    })
  }
}

export const sendMessage = (text) => {
  return (dispatch, getState) => {
    const { socket } = getState()

    if (!checkSocket(socket, dispatch)) {
      return
    }

    socket.send(JSON.stringify({ 
      author: 'user',
      text
    }))
  }
}

export const changeUsername = (username) => {
  return (dispatch, getState) => {

    const { socket } = getState()

    if (!checkSocket(socket, dispatch)) {
      return
    }

    socket.send(JSON.stringify({
      type: 'set_username',
      username
    }))
  }
}


const checkSocket = (socket, dispatch) => {
  if (!socket || !(socket instanceof WebSocket)) {
    dispatch(connectionError('Empty Socket'))
    return false
  }

  const status = socket.readyState
  
  // Reconnect
  if (status === WebSocket.CLOSED || status === WebSocket.CLOSING) {
    dispatch(connectToServer())
    return false
  }

  return true
}


// Users
const usersRequested = () => ({
  type: FETCH_USERS + REQUEST
})

export const getOnlineUsers = () => {
  return (dispatch, getState) => {
    const { socket } = getState()

    if (!checkSocket(socket, dispatch)) {
      return
    }

    dispatch(usersRequested())

    socket.send(JSON.stringify({
      type: 'online_users'
    }))
  }
}

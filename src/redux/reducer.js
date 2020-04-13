import { 
  SUCCESS, 
  FAILURE, 
  CONNECT, 
  REQUEST, 
  MESSAGE_RECEIVED, 
  SET_USERNAME 
} from './types'


const initialState = {
  loading: false,
  error: '',
  connected: false,
  socket: null,

  username: '',
  messages: []
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT + REQUEST:
      return { 
        ...state, 
        loading: true,
        username: '',
        error: '' 
      }
    case CONNECT + SUCCESS:
      return { 
        ...state, 
        loading: false, 
        connected: true, 
        socket: action.payload 
      }
    case CONNECT + FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      }
    case SET_USERNAME + REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case MESSAGE_RECEIVED:
      try {
        const message = JSON.parse(action.payload)

        if (message.type === 'set_username') {
          if (message.error) {
            return {
              ...state,
              loading: false,
              error: action.payload
            }
          } else {
            return {
              ...state,
              loading: false,
              username: message.username
            }
          }
        } else {
          return {
            ...state,
            messages: state.messages.concat(message)
          }
        }
      } catch (error) {
        console.log(error)
        return state
      }
    default:
      return state
  }
}

export default chatReducer

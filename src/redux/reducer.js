import { START, SUCCESS, FAILURE, CONNECT, REQUEST, MESSAGE_RECEIVED } from './types'


const initialState = {
  loading: false,
  error: '',
  connected: false,
  socket: null,

  messages: []
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT + REQUEST:
      return { 
        ...state, 
        loading: true, 
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
    case MESSAGE_RECEIVED:
      try {
        const message = JSON.parse(action.payload)
        return {
          ...state,
          messages: state.messages.concat(message)
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

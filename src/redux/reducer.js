import { 
  SUCCESS, 
  FAILURE, 
  CONNECT, 
  REQUEST, 
  DATA_RECEIVED, 
  SET_USERNAME, 
  FETCH_USERS,
  DISCONNECT
} from './types'


const initialState = {
  loading: false,
  error: '',
  connected: false,
  socket: null,

  username: '',
  messages: [],
  users: {
    loading: false,
    error: '',
    users: []
  }
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
    case DISCONNECT:
      return {
        ...state,
        loading: false,
        connected: false
      }
    case SET_USERNAME + REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }
    case FETCH_USERS + REQUEST:
      return {
        ...state,
        users: {
          loading: true,
          error: '',
          users: []
        }
      }
    case DATA_RECEIVED:
      try {
        const data = JSON.parse(action.payload)

        if (data.type === 'set_username') {
          if (data.error) {
            return {
              ...state,
              loading: false,
              error: action.payload
            }
          } else {
            return {
              ...state,
              loading: false,
              username: data.username
            }
          }
        } else if (data.type === 'online_users') {
          return {
            ...state,
            users: {
              loading: false,
              error: '',
              users: data
            }
          }
        } else {
          return {
            ...state,
            messages: state.messages.concat(data)
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

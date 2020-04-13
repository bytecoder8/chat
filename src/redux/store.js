import { createStore, applyMiddleware, compose } from 'redux'
import chatReducer from './reducer'


const asyncMiddleware = ({ dispatch, getState }) => next => action => {
  if ( typeof(action) === 'function' ) {
    return action(dispatch, getState)
  }
  return next(action)
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(chatReducer,
  composeEnhancers(
    applyMiddleware(asyncMiddleware)
  )
)

export default store

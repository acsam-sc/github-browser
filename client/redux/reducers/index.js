import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import userReducer from './user-reducer'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    userReducer
  })

export default createRootReducer

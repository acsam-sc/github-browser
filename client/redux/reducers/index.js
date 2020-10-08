import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import userReducer from './user-reducer'
import repoReducer from './repo-reducer'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    userReducer,
    repoReducer
  })

export default createRootReducer

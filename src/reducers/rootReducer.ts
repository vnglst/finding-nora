import { combineReducers } from 'redux'
import { game, navigation } from './reducers'

const rootReducer = combineReducers({
  game,
  navigation,
})

export default rootReducer

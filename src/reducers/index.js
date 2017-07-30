// @flow
import teams from './teams'
import app from './app'
import { combineReducers } from 'redux'

export default combineReducers({
  app,
  teams
})

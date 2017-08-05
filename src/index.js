import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import createStore from './create-store'
import { Provider } from 'react-redux'
import data from './data/odi-matches.json'
import tournaments from './data/tournaments.json'
import { loadMatches, loadTournaments } from './actions/matches'

const store = createStore()
store.dispatch(loadMatches(data))
store.dispatch(loadTournaments(tournaments))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()

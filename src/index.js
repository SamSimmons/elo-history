import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import createStore from './create-store'
import { Provider } from 'react-redux'
import data from './data/matches.json'
import { loadMatches } from './actions/matches'

const store = createStore()
store.dispatch(loadMatches(data))

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()

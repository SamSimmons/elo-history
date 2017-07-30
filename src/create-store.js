import { createStore } from 'redux'
import reducers from './reducers'
import type { Store } from './types/store'

/**
 * Isolate the store creation into a function, so that it can be used outside of the
 * app's execution context, e.g. for testing.
 * @return {object} Redux store.
 */

 export default function initializeStore(): Store {
   const store = createStore(
     reducers,
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   )
   return store
 }

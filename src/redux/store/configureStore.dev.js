import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import api from '../middleware/api'
import rootReducer from '../reducers'

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, api, logger)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore

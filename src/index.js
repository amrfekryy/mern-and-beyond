import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

// store and reducer imports
import { createStore } from 'redux'
import allReducers from './reducers'
// connector import to connect store with our app
import { Provider } from 'react-redux'

// initialize store with combined reducers, activate Redux devtools
export const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// connect React app with Redux and render
ReactDOM.render(
  <Provider store={store}> <App /> </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

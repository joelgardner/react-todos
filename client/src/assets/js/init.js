import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import baselineApp from './reducers/baselineApp'
import App from './components/App.jsx'
import { fetchTodos } from './actions/actions'

// build our store
let store = createStore(baselineApp, applyMiddleware(thunkMiddleware))

// initialize the app
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
)

// kick off a get of the todos
store.dispatch(fetchTodos());

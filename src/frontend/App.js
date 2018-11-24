import React, { Fragment } from 'react'
import { Provider } from 'mobx-react'
import { Route, HashRouter as Router } from 'react-router-dom'
import RootStore from './stores/'
import Main from './Main'

const store = new RootStore()
window.store = store

const App = () => (
  <Provider {...store}>
    <Router>
      <Fragment>
        <Route path="/" component={Main} />
      </Fragment>
    </Router>
  </Provider>
)

export default App

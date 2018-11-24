import React, { Fragment } from 'react'
import { Provider } from 'mobx-react'
import { Route, Switch, HashRouter as Router } from 'react-router-dom'
import RootStore from './stores/'
import MemesPage from './pages/Memes/'
import LandingPage from './pages/Landing/'

const store = new RootStore()
window.store = store

const App = () => (
  <Provider {...store}>
    <Router>
      <Fragment>
        <Route path="/" component={LandingPage} />
        <Route path="/memes" component={MemesPage} />
      </Fragment>
    </Router>
  </Provider>
)

export default App

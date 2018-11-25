import React, { Fragment } from 'react'
import { Provider } from 'mobx-react'
import { Route, HashRouter as Router } from 'react-router-dom'
import RootStore from './stores/'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Main from './Main'
import Profile from './pages/Profile/'


const store = new RootStore()
window.store = store

const App = () => (
  <Provider {...store}>
    <Router>
      <Fragment>
        <Route exact path="/" component={Main} />
        <Fragment>
          <NavBar />
          <Route path="/profile" component={Profile} />
          <Footer />
        </Fragment>
      </Fragment>
    </Router>
  </Provider>
)

export default App

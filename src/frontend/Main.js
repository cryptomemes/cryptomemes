import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import MemesPage from './pages/Memes/'
import LandingPage from './pages/Landing/'

class Main extends React.Component {
  componentDidMount() {
    const { authenticate } = this.props.authStore;
    authenticate();
  }

  render() {
    const { userStore: { loggedInUser }, authStore: { isAuthenticating } } = this.props

    if (isAuthenticating) return "Loading..."

    return (
      <Fragment>
      {loggedInUser ? <MemesPage /> : <LandingPage />}
  </Fragment>
    )
  }
}

export default inject('userStore', 'authStore')(observer(Main))
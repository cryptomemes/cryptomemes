import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import MemesPage from './pages/Memes/'
import LandingPage from './pages/Landing/'
import Loader from './components/Loader'

class Main extends React.Component {
  componentDidMount() {
    const { authenticate } = this.props.authStore;
    authenticate();
  }

  render() {
    const { userStore: { loggedInUser }, 
    authStore: { isAuthenticating }, memeStore: { memeContract } } = this.props

    if (isAuthenticating || !memeContract) return <Loader />

    return (
      <Fragment>
        {loggedInUser ? <MemesPage /> : <LandingPage />}
      </Fragment>
    )
  }
}

export default inject('userStore', 'authStore', 'memeStore')(observer(Main))
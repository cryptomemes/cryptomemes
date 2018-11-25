import React, { Fragment } from 'react';
import { Button, Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import SignupForm from '../../components/SignupForm'

const Page = styled.div`
    width: 100vw;
    height: 100vh;
`;

const Hero = styled.div`
  width: 100vw;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const H2 = styled.h2`
  color: #333;
  font-weight: 300;
  font-size: 2.2em;
`;

const Metamask = styled.img`
  width: 135px;
  height: auto;
  margin-bottom: 30px;
`;

const Explainer = styled.div`
  background: #F6F9FC;
  width: 100vw;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Explanation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
  margin: 40px;
`;

const Text = styled.div`
  width: 60%;
  text-align: center;
  margin-top: 20px;
`;

@inject('userStore', 'web3Store', 'authStore')
@observer
class Landing extends React.Component {
  state = {
    isLoading: false,
    error: null,
    isSignup: false
  }

  onContinue = async () => {
    const { userStore: { checkUserProfile }, authStore: { signup } } = this.props;
    this.setState({ isLoading: true });
    
    const { error } = await checkUserProfile();
    
    if (error) {
      this.setState({ error });
    }

    try {
      await signup();
    } catch (e) {
      this.setState({ error: 'Failed to signup' });
    }
    this.setState({ isLoading: false });
  }

  renderSignInWithMetaMask = () => {
    return (
      <Fragment>
        <H2> CryptoMemes</H2>
        <Metamask src="http://res.cloudinary.com/depjh17m6/image/upload/v1536813692/Etc/metamask.png" alt="metamask" />
        <Button type="primary" onClick={this.onContinue} style={{ fontSize: '20px', width: '275px' }} loading={this.state.isLoading}>
          {
            (this.state.isLoading) && 'Verifying'
          }
          {
            (!this.state.isLoading && !this.state.error) && 'Continue with metamask'
          }
          {
            !this.state.isLoading && this.state.error
          }
          {
            !this.state.isLoading &&
            (this.state.error ? <Icon type="close-circle" theme="outlined" /> : <Icon type="check-circle" theme="outlined" />)
          }
        </Button>
        <Button
          className="btn-link"
          onClick={this.handleToggleSignup}>
          Don't have an account? Sign up here
        </Button>
      </Fragment>
    )
  }

  renderSignupForm = () => {
    return (
      <Fragment>
        <H2>Sign up</H2>
        <SignupForm />
        <Button
          className="btn-link"
          onClick={this.handleToggleSignup}
        >
          Back to Metamask Sign in
        </Button>
      </Fragment>
    )
  }

  handleToggleSignup = () => {
    this.setState({
      isSignup: !this.state.isSignup
    })
  }

  render() {
    const { isSignup } = this.state

    return (
      <Page>
        <Hero>
          {isSignup
            ? (
              this.renderSignupForm()
            ) : (
              this.renderSignInWithMetaMask()
            )
          }
        </Hero>
        <Explainer>
          <Explanation>
            <Icon type="check-circle" theme="outlined" style={{ fontSize: '90px', color: '#A8DADB' }} />
            <Text>
          A check sign means metamask is installed and you unlocked your account - you're ready to go!
            </Text>
          </Explanation>
          <Explanation >
            <Icon type="lock" theme="outlined" style={{ fontSize: '90px', color: '#A8DADB' }} />
            <Text>
          A locked sign means that you haven't logged in metamask. Input your password and get started.
            </Text>
          </Explanation>
          <Explanation>
            <Icon type="close-circle" theme="outlined" style={{ fontSize: '90px', color: '#A8DADB' }} />
            <Text>
          A cross sign means that metamask is not installed, install metamask first in your browser
            </Text>
          </Explanation>
        </Explainer>
      </Page>
    );
  }
}

export default Landing;

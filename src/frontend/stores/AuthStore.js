import { action, observable } from 'mobx';
import { notification } from 'antd';
import app from '../client';

export default class AuthStore {
  @observable isAuthenticating;

  constructor(root) {
    this.root = root;
  }

  @action.bound
  async authenticate() {
    this.isAuthenticating = true;
    try {
      const token = await app.authenticate();
      const payload = await app.passport.verifyJWT(token.accessToken);
      const user = await app.service('api/users').get(payload.userId);
      this.root.userStore.setLoggedInUser(user);
    } catch (e) {
      console.log(e);
    }
    this.isAuthenticating = false;
  }

  @action.bound
  async signinWithMetamask(signature, publicAddress) {
    try {
      const token = await app.authenticate({
        signature,
        publicAddress,
        strategy: 'metamask',
      });
      const payload = await app.passport.verifyJWT(token.accessToken);
      const user = await app.service('api/users').get(payload.userId);
      this.root.userStore.setLoggedInUser(user);
    } catch (e) {
      notification.open({
        message: 'Error on signing up on metamask',
        description: 'Try to reload your browser again',
      });
    }
  }

  @action.bound
  async signup(username, password) {
    const { web3Store, web3Store: { web3 } } = this.root;
    const publicAddress = web3Store.userAddress;
    console.log('address:', publicAddress);
    if (!publicAddress) throw new Error('No user in metamask');
    if (!web3) throw new Error('No web3 istance found');

    const users = (await app.service('api/users').find({ query: { publicAddress } }));
    let user = users[0];

    if (users.length === 0) {
      user = await app.service('api/users').create({ username, password });
    }

    const signature = await web3.eth.personal.sign(web3.utils.fromUtf8(`I am signing my one-time nonce: ${user.nonce}`), user.publicAddress);
    await this.signinWithMetamask(signature, user.publicAddress);
  }

  @action.bound
  async logout() {
    try {
      await app.logout();
      this.root.userStore.setLoggedInUser(null);
    } catch (e) {
      notification.open({
        message: 'Error on logging out account',
        description: 'Please try again later',
      });
    }
  }
}
import MemeStore from './MemeStore';
import Web3Store from './Web3Store';
import UserStore from './UserStore';
import AuthStore from './AuthStore';

export default class RootStore {
  constructor() {
    this.memeStore = new MemeStore(this);
    this.web3Store = new Web3Store(this);
    this.userStore = new UserStore(this);
    this.authStore = new AuthStore(this);
  }
}
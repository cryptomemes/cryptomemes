import MemeStore from './MemeStore';
import Web3Store from './Web3Store';

export default class RootStore {
  constructor() {
    this.memeStore = new MemeStore(this);
    this.web3Store = new Web3Store(this);
  }
}
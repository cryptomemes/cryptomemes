import { observable, action } from 'mobx';
import { notification } from 'antd';
import app from '../client';

export default class UserStore {
  @observable loggedInUser;
  contract;
  @observable users = [];

  constructor(root) {
    this.root = root;
    this.fetchUsers();
  }

  @action.bound
  async fetchUsers() {
    this.users = await app.service('/api/users').find();
  }

  @action.bound
  setLoggedInUser(user) {
    this.loggedInUser = user;
  }

  @action.bound
  async checkUserProfile() {
    if (!this.root.web3Store.userAddress) {
      return { isComplete: false, error: 'No Web3 found' };
    }

    try {
      const user = await app.service('api/users').find({ query: { publicAddress: this.root.web3Store.userAddress } });
      if (user.length <= 0) {
        return { isComplete: false, error: 'No user found' };
      }
      // return { isComplete: user[0] };
      console.log('user[0]:', user[0]);
      return { isComplete: user[0] };
    } catch (e) {
      console.log('wtf::', e);
      return { isComplete: false, error: 'An error occured' };
    }
  }
}
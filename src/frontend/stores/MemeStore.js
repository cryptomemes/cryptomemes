import { observable, action } from 'mobx';

export default class MemeStore {

  @observable memes = [];
  memeContract;

  constructor(root) {
    this.root = root;
  }

  setContract(contract) {
    this.memeContract = contract;
  }

  @action.bound
  async fetchMemes() {
    if (!this.memeContract) throw new Error('Meme contract is not initialized');

    // const memes = await this.memeContract.
  }

}
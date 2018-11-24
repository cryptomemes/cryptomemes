import { observable, action } from 'mobx';
import awaitAllPromises from '../../utils/awaitAllPromises';

export default class MemeStore {
  @observable memes = [];
  @observable memeContract;

  constructor(root) {
    this.root = root;
  }

  setContract(contract) {
    this.memeContract = contract;
  }

  @action.bound
  async fetchMemes() {
    const memesLength = (await this.memeContract.getMemesLength.call()).toNumber();
    const memesPromises = [];
    for (let i = 0; i < memesLength; i++) {
      memesPromises.push(this.memeContract.memes.call(i));
    }
    const memes = await awaitAllPromises(memesPromises)
  }

  @action.bound
  async createMeme(title, image) {
    try {
      await this.memeContract.createMeme(title, image, { from: this.root.web3Store.getUserAddress() })
    } catch (e) {
      console.log(e)
    }
  }
}
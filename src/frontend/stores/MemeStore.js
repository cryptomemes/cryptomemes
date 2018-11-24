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
    this.memes = memes
  }

  @action.bound
  async createMeme(title, image, price) {
    try {
      await this.memeContract.createMeme(title, image, { from: await this.root.web3Store.getUserAddress(), value: price })
    } catch (e) {
      console.log(e)
    }
  }
}
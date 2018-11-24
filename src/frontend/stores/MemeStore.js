import { observable, action } from 'mobx';
import awaitAllPromises from '../../utils/awaitAllPromises';
import sanitizeMemes from '../../utils/sanitizeMemes';

export default class MemeStore {
  @observable memes = [];
  @observable isMemeFetching;
  @observable memeContract;

  constructor(root) {
    this.root = root;
  }

  setContract(contract) {
    this.memeContract = contract;
  }

  @action.bound
  async fetchMemes() {
    this.isMemeFetching = true;
    const memesLength = (await this.memeContract.getMemesLength.call()).toNumber()
    const memesPromises = []
    const memesPromisesDetails = []
    for (let i = 0; i < memesLength; i++) {
      memesPromises.push(this.memeContract.memes.call(i))
      memesPromisesDetails.push(this.memeContract.getMemeDetails.call(i))
    }
    const memes = await awaitAllPromises(memesPromises)
    const memeDetails = await awaitAllPromises(memesPromisesDetails)
    const sanitizedMemes = sanitizeMemes(memes, memeDetails, this.root.web3Store.web3)
    this.memes = sanitizedMemes.reverse()
    this.isMemeFetching = false
  }

  @action.bound
  async createMeme(title, image, price) {
    try {
      await this.memeContract.createMeme(
        title, 
        image, 
        { 
          from: await this.root.web3Store.getUserAddress(), 
          value: price,
        }
      )
    } catch (e) {
      console.log(e)
    }
  }
  
  @action.bound
  async upvoteMeme(memeIndex) {
    try {
      await this.memeContract.upvoteMeme(memeIndex, { from: await this.root.web3Store.getUserAddress(), value: 0})
    } catch (e) {
      console.log(e)
    }
  }
}

import { observable, action } from 'mobx';

export default class Web3Store {
  @observable web3;
  @observable userAddress = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';
  constructor(root) {
    this.root = root;
  }

  @action.bound
  addWeb3(web3Instance) {
    this.web3 = web3Instance;
  }

  @action.bound
  async getUserAddress() {
    if (!this.userAddress) {
      this.userAddress = await this.web3.eth.getCoinbase();
    }
    return this.userAddress;
  }
}
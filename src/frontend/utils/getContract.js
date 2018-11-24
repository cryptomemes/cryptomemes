/* eslint-disable import/no-extraneous-dependencies */

import contract from 'truffle-contract';
import memeContract from '../../../build/contracts/MemeFactory.json';

const getContract = async (web3) => {
  const meme = contract(memeContract);
  meme.setProvider(web3.currentProvider);
  return meme.deployed();
};

export default getContract;

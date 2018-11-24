/* eslint-disable import/no-extraneous-dependencies */

import contract from 'truffle-contract';
import landTitleContract from '../../../build/contracts/LandTitle.json';

const getContract = async (web3) => {
  const landTitle = contract(landTitleContract);
  landTitle.setProvider(web3.currentProvider);
  return landTitle.deployed();
};

export default getContract;

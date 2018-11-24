import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import getWeb3 from './utils/getWeb3';

getWeb3
  .then(async (res) => {
    store.web3Store.addWeb3(res.web3Instance);
    await store.web3Store.getUserAddress();
    // const contract = await getContract(res.web3Instance);
    // store.LandStore.setContract(contract);
    // store.UserStore.setContract(contract);
  })
  .catch(err => console.log(err));

render(
  <App/>,
  document.getElementById('mount-point'),
);

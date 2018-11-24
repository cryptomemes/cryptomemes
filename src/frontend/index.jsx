import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
// import getWeb3 from './utils/getWeb3';

// getWeb3
//   .then(async (res) => {
//     console.log(res)
//   })
//   .catch(err => console.log(err));

render(
  <App/>,
  document.getElementById('mount-point'),
);

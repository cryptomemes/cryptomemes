const HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = 'execute ankle fiscal laundry voyage kiwi rich scan chalk defense risk glory';
// please dont steal ma funds

module.exports = {
  networks: {
    ropsten: {
      provider() {
        return new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/4j50CPIg7m1Fp24GLDrR');
      },
      network_id: 3,
    },
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
    },
  },
};

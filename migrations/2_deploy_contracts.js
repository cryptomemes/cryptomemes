const MemeFactory = artifacts.require('./MemeFactory.sol');

module.exports = function(deployer) {
  deployer.deploy(MemeFactory)
    // .then(() => console.log(MemeFactory.address))
    .then(() => MemeFactory.deployed())
    .then(_instance => console.log(_instance.address));

};

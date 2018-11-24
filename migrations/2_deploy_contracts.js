const MemeFactory = artifacts.require('./MemeFactory.sol');

module.exports = function(deployer) {
  deployer.deploy(MemeFactory);
};

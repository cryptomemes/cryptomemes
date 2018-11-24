const LandTitle = artifacts.require('./LandTitle.sol');

module.exports = function(deployer) {
  deployer.deploy(LandTitle);
};

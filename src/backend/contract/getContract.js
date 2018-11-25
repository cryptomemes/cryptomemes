import Web3 from 'web3'
import TruffleContract from 'truffle-contract';
import MemeFactory from '../../../build/contracts/MemeFactory.json';

function fixTruffleContractCompatibilityIssue(contract) {
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function() {
            return contract.currentProvider.send.apply(
                contract.currentProvider, arguments
            );
        };
    }
    return contract;
}

async function getContract() {
    const provider = 'https://ropsten.infura.io/4j50CPIg7m1Fp24GLDrR'
    const web3 = new Web3(new Web3.providers.HttpProvider(provider))
    const contractAddress = '0xe501dcf3ebd76f0744091e6d8751ba2ce2a8f2e4' // add as env variable
    const Contract = await TruffleContract(MemeFactory);
    Contract.setProvider(web3.currentProvider);
    const fixedContract = fixTruffleContractCompatibilityIssue(Contract)
    await fixedContract.deployed();
    const memeContract = fixedContract.at(contractAddress);
    return memeContract;
}

export default getContract
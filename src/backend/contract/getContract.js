import Web3 from 'web3'
import { contractABI, contractBytecode, contractAddress, ropstenProvider} from './contractVariables';

async function getContract() {
    let web3 = new Web3(new Web3.providers.HttpProvider(ropstenProvider));
    web3.eth.accounts.wallet.add(process.env.ADMIN_PRIVATE_KEY);
    let contract = new web3.eth.Contract(
        contractABI,
        contractAddress, {
          data: contractBytecode,
          from: web3.eth.accounts.wallet[0].address,
          gas: 200000
        }
    )
    return { contract: contract.methods, web3: web3 };
}

export default getContract
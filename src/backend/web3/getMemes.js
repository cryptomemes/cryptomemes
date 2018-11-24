import getContract from './getContract'
import awaitAllPromises from '../../utils/awaitAllPromises';

async function getMemes() {
  try {
    const contract = await getContract();
    const memesLength = (await contract.getMemesLength()).toNumber();
    const memesPromises = [];

    for (let i = 0; i < memesLength; i++) {
      memesPromises.push(contract.memes(i));
    }

    const memes = await awaitAllPromises(memesPromises)
    return memes;
  } catch (e) {
    console.log(e)
  }
}

export default getMemes;
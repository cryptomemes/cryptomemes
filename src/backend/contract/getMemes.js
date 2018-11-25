import getContract from './getContract'
import awaitAllPromises from '../../utils/awaitAllPromises';

async function getMemes() {
  try {
    const contract = await getContract()
    const memesLength = (await contract.getMemesLength()).toNumber()
    const memesPromisesWithIndex = []
    const memesPromises = []

    for (let i = 0; i < memesLength; i++) {
      memesPromises.push(contract.getMemeDetails(i));
      memesPromisesWithIndex.push(contract.memes(i));
    }

    const memes = await awaitAllPromises(memesPromises)
    const memesWithIndex = await awaitAllPromises(memesPromisesWithIndex)
    const memesWithUpvotes = memes.map((meme, index) => {
      return { id: Number(memesWithIndex[index][0]), upvotes: meme[0].map(a => Number(a)) } 
    })
    console.log(memesWithUpvotes)
    return memesWithUpvotes;
  } catch (e) {
    console.log(e)
  }
}

export default getMemes;
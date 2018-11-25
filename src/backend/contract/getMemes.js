import getContract from './getContract'
import awaitAllPromises from '../../utils/awaitAllPromises';

async function getMemes() {
  try {
    const { contract } = await getContract()
    const memesLength = await contract.getMemesLength().call()
    const memesPromisesWithIndex = []
    const memesPromises = []

    for (let i = 0; i < memesLength; i++) {
      memesPromises.push(contract.getMemeDetails(i).call());
      memesPromisesWithIndex.push(contract.memes(i).call());
    }

    const memes = await awaitAllPromises(memesPromises)
    const memesWithIndex = await awaitAllPromises(memesPromisesWithIndex)
    const memesWithUpvotes = memes.map((meme, index) => {
      return { 
        id: Number(memesWithIndex[index][0]), 
        upvotes: meme[0].map(a => Number(a)),
        basePrice: Number(memesWithIndex[index][4])
      } 
    })

    console.log(memesWithUpvotes)
    return memesWithUpvotes;
  } catch (e) {
    console.log(e)
  }
}

export default getMemes;
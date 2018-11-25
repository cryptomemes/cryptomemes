import getContract from './getContract'
import awaitAllPromises from '../../utils/awaitAllPromises'

/* [{ index: 0, price: 23}] */

function updateMeme(meme, contract, web3) {
  const { index, price } = meme
  contract.updateMemePrice(index, price).send({
    from: web3.eth.accounts.wallet[0].address
  })
}

async function updateMemePrices(memes) {
    const { contract, web3 } = await getContract()
    const promises = []
    for (let i = 0; i < memes.length; i++) {
      promises.push(updateMeme(memes[i], contract, web3))
    }
    await awaitAllPromises(promises)
}

export default updateMemePrices
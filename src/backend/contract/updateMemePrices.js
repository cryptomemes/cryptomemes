import getContract from './getContract'

function updateMeme(indexes, newPrices, contract, web3) {
  return contract.batchUpdateMemePrices(indexes, newPrices).send({
    from: web3.eth.accounts.wallet[0].address
  })
}

/* 
  [[array of indexes], [array of new prices]]
  [[0,1,2,3,4], [12,14,15,16,16]]
*/

async function updateMemePrices(memes) {
    const { contract, web3 } = await getContract()
    const indexes = memes[0]
    const newPrices = memes[1]
    try {
      const res = await updateMeme(indexes, newPrices, contract, web3)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
}

export default updateMemePrices
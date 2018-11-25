const sanitizeMemes = (memes, memeDetails, web3) => {
  const FIELDS = [
    'index',
    'photoImage',
    'title',
    'price',
    'basePrice',
    'upvotesIndex',
    'sellablesIndex',
    'upvotes',
    'sellables',
    'owners'
  ]

  const sanitizedMemes = memes
  .map((meme, index) => {
    const concatedMeme = [...meme, ...memeDetails[index]]
    return concatedMeme 
  }).map((meme, index) => {
    const memeObject = {};
    FIELDS.forEach((field, index) => {
      switch (field) {
        case 'index': 
          memeObject[field] = Number(meme[index])
          break;
        case 'photoImage':
          memeObject[field] = web3.utils.toUtf8(meme[index])
          break;
        case 'title':
          memeObject[field] = web3.utils.toUtf8(meme[index])
          break;
        case 'price':
          memeObject[field] = Number(meme[index])
          break;
        case 'basePrice':
          memeObject[field] = Number(meme[index])
          break;
        case 'upvotesIndex':
          memeObject[field] = Number(meme[index])
          break;
        case 'sellablesIndex':
          memeObject[field] = Number(meme[index])
          break;
        case 'upvotes':
          memeObject[field] = meme[index] ? meme[index].map(a => Number(a)) : []
          break;
        case 'sellables':
          memeObject[field] = meme[index] ? meme[index].map(a => Number(a)) : []
          break;
        default:
          memeObject[field] = meme[index]
          break;
      }
    })
    return memeObject
  })

  return sanitizedMemes
}

export default sanitizeMemes
import getMemes from './contract/getMemes'

const bracket = [
    { min: -Infinity, max: 4, value: 1.0 },
    { min: 5, max: 9, value: 2.0 },
    { min: 10, max: 19, value: 3.0 },
    { min: 20, max: 29, value: 4.0 },
    { min: 30, max: 44, value: 5.5 },
    { min: 45, max: 59, value: 7.0 },
    { min: 60, max: 79, value: 9.0 },
    { min: 80, max: 99, value: 11.0},
    { min: 100, max: 129, value: 14.0 },
    { min: 130, max: 159, value: 17.0},
    { min: 160, max: 249, value: 21.0},
    { min: 250, max: 299, value: 26.0},
    { min: 300, max: 399, value: 30.0},
    { min: 400, max: 599, value: 40.0},
    { min: 600, max: Infinity, value: 0.1} // rate multiplier
]

// [1543070446529, 1543070446529, 1543070446529, 1543070446529, 1543070446529]

const isMaximum = (currentBracket) => currentBracket.max === Infinity

const getMultiplierValue = (currentValue, currentBracket) => {
    const { min, value } = currentBracket
    const previousBracket = bracket.slice(-2)[0]
    // console.log(currentValue, min, value, previousBracket)
    return ((currentValue - min) * value ) +  previousBracket.value
}

const computeVirality = (upvotes) => {
    const now = Math.floor(Date.now() / 1000)
    const oneMinuteAgo = now - 60
    const twoMinutesAgo = now - 120
    const currentRate = upvotes.filter(upvote => oneMinuteAgo <= upvote && now >= upvote).length
    const previousRate = upvotes.filter(upvote => twoMinutesAgo <= upvote && oneMinuteAgo > upvote).length
    const acceleration = currentRate - previousRate
    const currentBracket = bracket.find(entry => entry.min <= acceleration && entry.max >= acceleration )
    const value = isMaximum(currentBracket) ? getMultiplierValue(acceleration, currentBracket) : currentBracket.value 
    return { rate: acceleration, value, timestamp: now }
}

export const poll = async (app) => {
    console.log('polling...')
    console.log('app', app)
    const memes = await getMemes()
    const viralities = memes.map(meme => {
        const { id, upvotes } = meme
        return {
            id,
            ...computeVirality(upvotes),
        }
    })
    return app.service('/api/memes').create(viralities).then().catch(e => console.error(e))
}

export default computeVirality
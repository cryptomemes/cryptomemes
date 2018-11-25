import { expect } from 'chai'
import MockDate from 'mockdate'
import computeVirality from '../src/backend/virality'

const fixtures = [
    1543079319,
    1543079320,
    1543085321,
    1543089322,
    1543089323,
    1543089324,
]

const generateFixtures = (numElements) => {
    const now = Math.floor(Date.now() / 1000)
    return Array(numElements).fill(now)
}

describe('Virality', () => {

    afterEach(() => MockDate.reset())

    it('computes virality', () => {
        const value = computeVirality(fixtures)
        expect(value).to.be.equal(1.0)
        // console.log('result', value)
    })

    it ('computes virality of viral meme', () => {
        MockDate.set('10/15/2018 13:00')
        let timestamps = []
        timestamps = timestamps.concat(generateFixtures(20))
        MockDate.set('10/15/2018 13:01')
        timestamps = timestamps.concat(generateFixtures(30))
        // MockDate.set('10/15/2018 13:02')
        const value = computeVirality(timestamps)
        expect(value).to.be.equal(7.0)
    })

    it ('computes virality of viral meme', () => {
        MockDate.set('10/15/2018 13:00')
        let timestamps = []
        timestamps = timestamps.concat(generateFixtures(20))
        MockDate.set('10/15/2018 13:01')
        timestamps = timestamps.concat(generateFixtures(30))
        MockDate.set('10/15/2018 13:02')
        const value = computeVirality(timestamps)
        expect(value).to.be.equal(3.0)
    })

    it('computes virality max bracket, 700', () => {
        const timestamps = generateFixtures(700)
        const value = computeVirality(timestamps)
        expect(value).to.be.equal(50.0)
    })

    it('computes virality max bracket, 1500', () => {
        const timestamps = generateFixtures(1500)
        const value = computeVirality(timestamps)
        expect(value).to.be.equal(130.0)
    })
})
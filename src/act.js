// @flow
import { isArray, uniq, countBy, values, isEqual, reduce } from 'lodash'
import type { Action, State, ReRoll, DicesRoll } from './types'
import { create } from './state'
import { rollAll, roll as rollDice } from './dice'

function sum(res, v) {
  return res + v
}
function getCounts(roll) {
  const counts = countBy(roll)
  const countsArray = values(counts)
  return countsArray
}
function isKniffel(counts) {
  return counts.includes(6)
}
function isDreierPasch(counts) {
  return counts.includes(3)
}
function isViererPasch(counts) {
  return counts.includes(4)
}
function isFullHouse(counts) {
  return counts.includes(2) && counts.includes(3)
}
function isBigStreet(roll) {
  const u = uniq(roll)
  const options = [[1, 2, 3, 4, 5], [2, 3, 4, 5, 6]]
  return options.reduce((prev, pattern) => prev || isEqual(pattern, u), false)
}
function isSmallStreet(roll) {
  const u = uniq(roll)
  const options = [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]]
  const smallStreet = options.reduce((prev, pattern) => prev || isEqual(pattern, u), false)
  return isBigStreet(roll) || smallStreet
}
function isBonus(result) {
  return result.one + result.two + result.three + result.four + result.five + result.six >= 63
}
function getResult({ rate, roll }) {
  const counts = getCounts(roll)
  switch (rate) {
    case 'one':
      return roll.filter(v => v === 1).reduce(sum, 0)
    case 'two':
      return roll.filter(v => v === 2).reduce(sum, 0)
    case 'three':
      return roll.filter(v => v === 3).reduce(sum, 0)
    case 'four':
      return roll.filter(v => v === 4).reduce(sum, 0)
    case 'five':
      return roll.filter(v => v === 5).reduce(sum, 0)
    case 'six':
      return roll.filter(v => v === 6).reduce(sum, 0)
    case 'dreierPasch':
      return isDreierPasch(counts) ? roll.reduce(sum, 0) : 0
    case 'viererPasch':
      return isViererPasch(counts) ? roll.reduce(sum, 0) : 0
    case 'fullHouse':
      return isFullHouse(counts) ? roll.reduce(sum, 0) : 0
    case 'smallStreet':
      return isSmallStreet(roll) ? roll.reduce(sum, 0) : 0
    case 'bigStreet':
      return isBigStreet(roll) ? roll.reduce(sum, 0) : 0
    case 'kniffel':
      return isKniffel(counts) ? 50 : 0
    case 'chance':
      return roll.reduce(sum, 0)
    default:
      return 0
  }
}

function reroll({ toReroll, oldRoll }): DicesRoll {
  return oldRoll.map((value, index) => {
    const shouldReRoll: boolean = toReroll.includes(index)
    return shouldReRoll ? rollDice() : value
  })
}

export default ({ numberOfRolls, result, roll }: State, rawAction: Action): State => {
  const action = JSON.parse(rawAction)
  switch (action.type) {
    case 'rate': {
      const newResult = {
        ...result,
        [action.rate]: getResult({ rate: action.rate, roll }),
      }
      const newResultWithBonus = {
        ...newResult,
        bonus: isBonus(newResult) ? 35 : 0,
      }
      return create({
        numberOfRolls: 1,
        roll: rollAll(),
        result: {
          ...newResultWithBonus,
        },
      })
    }
    case 'reroll':
      if (numberOfRolls >= 3) throw Error(`numberOfRolls should be 2 or less`)
      return create({
        numberOfRolls: numberOfRolls + 1,
        roll: reroll({ toReroll: action.reroll, oldRoll: roll }),
        result,
      })

    default:
      throw Error(`unknown action.type: ${action.type}`)
  }
}

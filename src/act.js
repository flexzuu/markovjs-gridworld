// @flow
import { isArray } from 'lodash'
import type { Action, State, ReRoll, DicesRoll } from './types'
import { ACTIONS } from './constants'
import { create } from './state'
import { rollAll, roll as rollDice } from './dice'

function sum(res, v) {
  return res + v
}
function getResult({ rate, roll }) {
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

export default ({ numberOfRolls, result, roll }: State, action: Action): State => {
  switch (action.type) {
    case 'rate':
      return create({
        numberOfRolls: 1,
        roll: rollAll(),
        result: {
          ...result,
          [action.rate]: getResult({ rate: action.rate, roll }),
        },
      })
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

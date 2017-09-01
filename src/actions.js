// @flow
import { omitBy, keys } from 'lodash'
import type { Action, State, ActionReRoll, ActionRate } from './types'
import { REROLL_ACTIONS } from './constants'

export default (state: State): Array<Action> => {
  const { result } = state
  const possibleResult = omitBy(result, x => x !== null)
  const rateActions: Array<ActionRate> = keys(possibleResult).map(rate => ({
    type: 'rate',
    rate,
  }))
  if (state.phase === 'select') {
    return rateActions
  }
  if (state.phase === 'dice') {
    const reRollActions: Array<ActionReRoll> = REROLL_ACTIONS.map(reroll => ({
      type: 'reroll',
      reroll,
      rerollNumber: reroll.length || 1,
    }))
    const diceActions = [...rateActions, ...reRollActions]
    return diceActions
  }
  return []
}

// @flow
import { getNullKeys } from './utils'
import type { Action, State, ActionReRoll, ActionRate } from './types'
import { REROLL_ACTIONS } from './constants'

export default (state: State): Array<Action> => {
  const { result } = state
  const rateActions: Array<ActionRate> = getNullKeys(result).map(rate => ({
    type: 'rate',
    rate,
  }))
  if (state.numberOfRolls === 3) {
    return rateActions
  }
  const reRollActions: Array<ActionReRoll> = REROLL_ACTIONS.map(reroll => ({
    type: 'reroll',
    reroll,
  }))
  const diceActions = [...rateActions, ...reRollActions]
  return diceActions
}

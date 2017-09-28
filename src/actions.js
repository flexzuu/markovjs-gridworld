// @flow
import { values, differenceWith } from 'lodash'
import type { Action } from './types'
import { ACTIONS } from './constants'
import { actRight, actLeft, actUp, actDown } from './act'

export const availableActions = values(ACTIONS)

export const getFinalStates = state => {
  // const emptyFields = state.get('board').flatten().some(tile => tile === null)
  //   if (emptyFields) return false
  const directions = [actLeft, actUp, actRight, actDown]
  return directions.map(act => act(state)).map(possibleState => state.equals(possibleState))
}
export const toActions = (actions, finalStates) => {
  const selectedActions = actions.filter((action, index) => !finalStates[index])
  if (selectedActions.length === 0) return ['END']
  return selectedActions
}
export default (state): Array<Action> => {
  const finalStates = getFinalStates(state)
  return toActions(availableActions, finalStates)
}

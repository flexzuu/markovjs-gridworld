// @flow
import type { State } from './types'
import { actRight, actLeft, actUp, actDown } from './act'

const tryAllDirections = state => {
  const directions = [actRight, actLeft, actUp, actDown]
  const finalStates = directions
    .map(act => act(state))
    .map(possibleState => state.equals(possibleState))
  return finalStates.some(isFinal => isFinal)
}

export default (state: State): boolean => {
  const emptyFields = state.get('board').flatten().some(tile => tile === null)
  if (emptyFields) return false
  return tryAllDirections(state)
}

// @flow
import type { State } from './types'
import { ENEMY, ROBSON, EMPTY } from './constants'

// TODO: calulate instead of letting human decide if its a win or loose
const defeat = (state: State): boolean => state.winner === ENEMY
const victory = (state: State): boolean => state.winner === ROBSON
export default (state: State): boolean => defeat(state) || victory(state)
export { defeat, victory }

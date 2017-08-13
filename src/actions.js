// @flow
import { range } from 'lodash'
import type { Action, State } from './types'

export default (state: State): Array<Action> => {
  const actions = range(state.board.cols * state.board.rows).filter(
    n => !(state.enemy.includes(n) || state.robson.includes(n)),
  )
  return actions.length ? actions : [9999]
}
/*   switch (state.turn) {
    case '💀':
      return []
    case '🤖':
      return range(state.board.cols * state.board.rows).filter(
        n => state.enemy.includes(n) || state.robson.includes(n),
      )
    default:
      return []
  } */

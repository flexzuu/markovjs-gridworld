import { ENEMY } from './constants'
import act from './act'
import actions from './actions'

const testState = {
  board: { rows: 5, cols: 5 },
  turn: ENEMY,
  robson: [0],
  enemy: [1],
}
// actions(testState)
const state1 = act(testState)
const state2 = act(state1, 3)
const state3 = act(state2)
const state4 = act(state3, 5)
console.log(state4)

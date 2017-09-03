// @flow
import type { ReRoll } from './types'

const REROLL_ACTIONS: Array<ReRoll> = [
  [1],
  [2],
  [3],
  [4],
  [5],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [2, 3],
  [2, 4],
  [2, 5],
  [3, 4],
  [3, 5],
  [4, 5],
  [1, 2, 3],
  [1, 2, 4],
  [1, 2, 5],
  [1, 3, 4],
  [1, 3, 5],
  [1, 4, 5],
  [2, 3, 4],
  [2, 3, 5],
  [2, 4, 5],
  [3, 4, 5],
  [1, 2, 3, 4],
  [1, 2, 3, 5],
  [1, 2, 4, 5],
  [1, 3, 4, 5],
  [2, 3, 4, 5],
  [1, 2, 3, 4, 5],
]

export { REROLL_ACTIONS }

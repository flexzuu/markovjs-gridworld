// @flow
import type { State } from './types'
import { defeat, victory } from './final'

export default (state: State, prevState: State): number => {
  if (defeat(state)) return -1
  if (victory(state)) return 1
  return -0.01
}

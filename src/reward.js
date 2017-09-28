// @flow
import type { State } from './types'

export default (state: State, prevState: State): number =>
  state.get('score') - prevState.get('score') - (state.get('final') ? 1 : 0) - 0.01

// @flow
import type { State } from './types'

export default (state: State, prevState: State): number =>
  state.get('score') - prevState.get('score') - 0.01

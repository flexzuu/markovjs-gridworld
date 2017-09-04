// @flow
import { reduce } from 'lodash'
import type { State } from './types'

export default (state: State, prevState: State): number =>
  reduce(state.result, (prev, curr) => prev + (curr || 0), 0)

// @flow
import { reduce } from 'lodash'
import type { State } from './types'

const getResult = state => reduce(state.result, (prev, curr) => prev + (curr || 0), 0)

export default (state: State, prevState: State): number =>
  getResult(state) - (getResult(prevState) + 0.1)

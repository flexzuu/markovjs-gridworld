// @flow
import type { State } from './types'
import { getNullKeys } from './utils'

export default (state: State): boolean => getNullKeys(state.result).length === 0

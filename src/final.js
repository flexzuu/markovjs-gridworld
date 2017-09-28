// @flow
import type { State } from './types'
import { actRight, actLeft, actUp, actDown } from './act'
import { board } from './format'

export default (state: State): boolean => state.get('final')

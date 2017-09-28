// @flow
import { values, shuffle } from 'lodash'
import type { Action } from './types'
import { ACTIONS } from './constants'

const availableActions = values(ACTIONS)
export default (): Array<Action> => shuffle(availableActions)

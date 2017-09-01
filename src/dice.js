import { random, range } from 'lodash'
import type { DiceRoll, DicesRoll } from './types'

export const roll = (): DiceRoll => random(1, 6)
export const rollAll = (): DicesRoll => range(5).map(roll)

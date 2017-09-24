// @flow
import { values } from 'lodash'
import type { State } from './types'
import { rollAll } from './dice'

const getDefault = x => x || 0
const proto = {
  toString(): string {
    const { result, numberOfRolls, roll } = (this: State)
    const resultValues = values(result)
    const memory = [...resultValues, numberOfRolls, ...roll].toString()
    // console.log(memory)
    return memory
  },
}

const create = (state: State): State => (Object.assign(Object.create(proto), state): any)

const init = (): State =>
  create({
    numberOfRolls: 1,
    roll: rollAll(),
    result: {
      one: null,
      two: null,
      three: null,
      four: null,
      five: null,
      six: null,
      bonus: 0,
      dreierPasch: null,
      viererPasch: null,
      fullHouse: null,
      smallStreet: null,
      bigStreet: null,
      kniffel: null,
      chance: null,
    },
  })

export { init, create }

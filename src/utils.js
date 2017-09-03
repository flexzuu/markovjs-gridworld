// @flow
import { chain } from 'lodash'

export const getNullKeys = obj =>
  chain(obj)
    .omitBy(v => v !== null)
    .keys()
    .value()

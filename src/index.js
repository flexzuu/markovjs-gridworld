import 'babel-polyfill'
import markov from 'markovjs'
import * as memory from 'markovjs-immutable'
import { egreedy, greedy } from 'markovjs/policies'
import { random, sample, times, min, max, mean, last } from 'lodash'
import sparkly from 'sparkly'
import * as format from './format'
import * as state from './state'
import actions from './actions'
import reward from './reward'
import final from './final'
import act from './act'
import { init as initIPC } from './ipc'

const loggerProcess = initIPC()

setTimeout(() => {
  const game = { actions, reward, final, act }
  const initial = state.init({
    size: 4,
    startTiles: 2,
    random,
  })

  const α = 0.8 // learning rate
  const γ = 0.9 // discount factor
  const ε = 0.1 // exploration rate
  console.log('Start Training')
  const trainedMaschine = markov()
    .memory(memory, memory.init(0.0, a => a))
    .policies(sample, greedy) // egreedy(ε)
    .game(game, initial)
    .train(10, α, γ)
  // .play((
  //   e, // eslint-disable-next-line no-console
  // ) => format.episode(e))
  const results = []

  times(100, () => {
    trainedMaschine.play(e => {
      results.push(last(format.toData(e)).score)
    })
  })
  // // console.log(`results: ${results}`)
  console.log(`Min: ${min(results)}`)
  console.log(`Mean: ${mean(results)}`)
  console.log(`Max: ${max(results)}`)
  console.log(sparkly(results))
}, 10000)
loggerProcess.kill(0)

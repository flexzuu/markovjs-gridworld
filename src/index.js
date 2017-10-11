import 'babel-polyfill'
import markov from 'markovjs'
import * as memory from 'markovjs/memory'
import { egreedy, greedy } from 'markovjs/policies'
import { random, sample, times, min, max, mean, last } from 'lodash'
import sparkly from 'sparkly'
import * as format from './format'
import * as state from './state'
import actions from './actions'
import reward from './reward'
import final from './final'
import act from './act'
import { init as initIPC, setLearning } from './ipc'

const loggerProcess = initIPC()

loggerProcess.on('message', () => {
  const game = { actions, reward, final, act }
  const initial = state.init(
    [3, 3], // board
    [0, 0], // robson
    [[0, 2], [2, 2]], // goals
    [[0, 1], [2, 1]], // hazards
  )

  const α = 0.9 // learning rate
  const γ = 0.9 // discount factor
  const ε = 0.1 // exploration rate
  console.log('Start Training')
  setLearning(true)
  const trainedMaschine = markov()
    .memory(memory, memory.init(0.0))
    .policies(egreedy(ε), greedy)
    .game(game, initial)
    .train(10, α, γ)
  console.log('Stop Training')
  setLearning(false)

  trainedMaschine.play((
    e, // eslint-disable-next-line no-console
  ) => console.log(format.episode(e)))
})

loggerProcess.kill(0)

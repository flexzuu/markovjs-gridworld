import { fork } from 'child_process'

let learning = true
let n = null
export const init = () => {
  n = fork(`${__dirname}/socketServer.js`)
  return n
}
export const log = data => {
  console.log('send', learning)
  n.send(Object.assign({}, data, { learning }))
}
export const setLearning = l => {
  learning = l
  console.log('Changed Learningmode', learning)
}

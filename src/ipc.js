import { fork } from 'child_process'

let n = null
export const init = () => {
  n = fork(`${__dirname}/socketServer.js`)
  return n
}
export const log = data => n.send(data)

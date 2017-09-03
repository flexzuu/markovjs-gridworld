const state = s => `STATE: ${JSON.stringify(s, null, 2)}`
const transition = t => `TRANSITION: ${JSON.stringify(t, null, 2)}`
const episode = e => `EPISODE: ${JSON.stringify(e, null, 2)}`

export { state, transition, episode }

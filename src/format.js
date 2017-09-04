const state = s => `STATE: ${JSON.stringify(s, null, 2)}`
const transition = t => `TRANSITION: ${JSON.stringify(t, null, 2)}`
const episode = e => [...e].map(t => transition(t)).join('\n\n')

export { state, transition, episode }

const Server = require('socket.io')

const io = new Server(8080, {
  transports: ['websocket'],
})
process.on('message', data => {
  io.sockets.emit('state', data)
  console.log('WS-emit:', data)
})

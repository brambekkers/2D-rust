import { Server } from 'socket.io'

const world = {
  width: 6000,
  height: 6000
}

const io = new Server(3000, {
  cors: {
    origin: 'http://127.0.0.1:5173'
  }
})

io.on('connection', (socket) => {
  socket.on('getWorld', () => {
    socket.emit('sentWorld', world)
    console.log('get world') // world
  })
})

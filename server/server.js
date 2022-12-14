import { Server } from 'socket.io'

const world = {
  // Server size
  width: 6000,
  height: 6000,
  // xTiles = width / 256 + 3
  xTiles: 26,
  // yTiles = height / 64 + 3
  yTiles: 96,

  // players
  spawnPoints: [{ x: 1000, y: 1000 }]
}

const players = {}

const io = new Server(3000, {
  cors: {
    origin: 'http://127.0.0.1:5173'
  }
})

io.on('connection', (socket) => {
  players[socket.id] = { id: socket.id, x: -1000, y: -1000 }
  console.log('user connected')
  logPlayerAmount()

  socket.on('getWorld', () => {
    socket.emit('sentWorld', world)
  })

  socket.on('updatePlayer', ({ x, y }) => {
    players[socket.id] = { id: socket.id, x, y }
    socket.emit('updatePlayers', players)
  })

  socket.on('disconnect', () => {
    delete players[socket.id]

    console.log('disconnected')
    logPlayerAmount()
    socket.broadcast.emit('updatePlayers', players)
  })
})

const logPlayerAmount = () => {
  console.log(Object.keys(players).length, 'players')
  console.log('----------------------------------------')
}

import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { usePlayersStore } from './players'
import { useWorldStore } from './world'

export const useSocketStore = defineStore('socket', {
  state: () => ({
    socket: null
  }),
  actions: {
    connectToServer() {
      this.socket = io('http://127.0.0.1:3000')
      this.socket.on('connect', () => {
        this.socket.emit('getWorld')
      })

      this.socket.on('sentWorld', (world) => {
        const worldStore = useWorldStore()
        worldStore.updateWorld(world)
      })

      this.socket.on('updatePlayers', (players) => {
        const playersStore = usePlayersStore()
        playersStore.updatePlayers(players)
      })
    }
  }
})

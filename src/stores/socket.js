import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

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
      this.socket.on('sentWorld', (World) => {
        console.log('Update world', World) // world
      })
    }
  }
})

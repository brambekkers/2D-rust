import { defineStore } from 'pinia'

export const usePlayersStore = defineStore('players', {
  state: () => ({
    players: {}
  }),
  actions: {
    updatePlayers(players) {
      this.players = players
    }
  }
})

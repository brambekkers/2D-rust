import { defineStore } from 'pinia'

export const useWorldStore = defineStore('world', {
  state: () => ({
    world: {
      width: 800,
      height: 600
    },
    worldLoaded: false
  }),
  actions: {
    updateWorld(world) {
      this.worldLoaded = true
      this.world = world
    }
  }
})

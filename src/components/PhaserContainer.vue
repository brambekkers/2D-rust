<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue'
  import { useSocketStore } from '../stores/socket'
  import { useWorldStore } from '../stores/world'

  let gameInstance: any = null
  const containerId = 'game-container'

  // Wait for socket to connect before loading game
  const isConnected = () =>
    new Promise((resolve) => {
      const socketStore = useSocketStore()
      const interval = setInterval(() => {
        if (socketStore.socket.connected) {
          clearInterval(interval)
          resolve(true)
        }
      }, 100)
    })
  await isConnected()

  // Wait for world data to be received before loading game
  const isWorldLoaded = () =>
    new Promise((resolve) => {
      const worldStore = useWorldStore()
      const interval = setInterval(() => {
        if (worldStore.worldLoaded) {
          clearInterval(interval)
          resolve(true)
        }
      }, 100)
    })
  await isWorldLoaded()

  const game = await import(/* webpackChunkName: "game" */ '../game/game.js')

  onMounted(() => {
    gameInstance = game.launch(containerId)
  })

  onUnmounted(() => {
    gameInstance.destroy(false)
  })
</script>

<template>
  <div :id="containerId" />
</template>

<style>
  #game-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>

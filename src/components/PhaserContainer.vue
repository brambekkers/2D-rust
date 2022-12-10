<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue'

  let gameInstance: any = null
  const containerId = 'game-container'
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

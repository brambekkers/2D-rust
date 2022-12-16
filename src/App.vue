<script setup lang="ts">
  import Game from './components/Game.vue'
  import { onMounted, onUnmounted } from 'vue'
  import { useSocketStore } from './stores/socket'

  const socket = useSocketStore()
  onMounted(() => {
    socket.connectToServer()
  })

  onUnmounted(() => {
    socket.disconnectFromServer()
  })
</script>

<template>
  <Game />
</template>

<style lang="scss">
  body {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
</style>

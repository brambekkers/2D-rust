import { Scene } from 'phaser'
import { useWorldStore } from '../../stores/world'
import { usePlayersStore } from '../../stores/players'
import { useSocketStore } from '../../stores/socket'

// Classes
import World from '../scripts/World'
import Character from '../scripts/Character'

export default class PlayScene extends Scene {
  constructor() {
    super({ key: 'PlayScene' })

    this.characters = {}
  }

  create() {
    const socketStore = useSocketStore()
    const worldStore = useWorldStore()
    const { width, height, spawnPoints } = worldStore.world

    // Add background
    const world = new World({ scene: this })

    // Add player
    const personalID = socketStore.socket.id
    const spawnPoint = spawnPoints[0]
    this.characters[personalID] = new Character({ scene: this, x: spawnPoint.x, y: spawnPoint.y })
    socketStore.socket.emit('updatePlayer', { x: spawnPoint.x, y: spawnPoint.y })

    // Set camera
    this.cameras.main.setBounds(0, 0, width, height)
    this.physics.world.setBounds(0, 0, width, height)
    this.cameras.main.startFollow(this.characters[personalID].sprite, false, 0.09, 0.09)

    this.cameras.main.setZoom(1)
  }

  update() {
    this.updateCharacters()
  }

  updateCharacters() {
    const socketStore = useSocketStore()
    const playersStore = usePlayersStore()
    const personalID = socketStore.socket.id

    // Loop over all players and update their position
    for (const id in playersStore.players) {
      const p = playersStore.players[id]
      // If player doesn't exist, create it
      if (!this.characters[id]) this.characters[id] = new Character({ scene: this, x: p.x, y: p.y })

      const c = this.characters[id]
      const { x: pX, y: pY } = p
      const { x: cX, y: cY } = c.sprite

      // If player is me, update their position and play their animation
      if (id === personalID) {
        c.playerInput()
        c.playerAnimation(p)
        // If player has moved, emit their new position
        if (cX != pX || cY != pY) socketStore.socket.emit('updatePlayer', { x: cX, y: cY })
      }

      // If player is not me and they moved, update their position and play their animation
      if (id != personalID && (cX != pX || cY != pY)) {
        console.log('not me', p)
        c.playerAnimation(p)
        c.move(p)
      }
    }
  }
}

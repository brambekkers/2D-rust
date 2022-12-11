import { Scene } from 'phaser'
import { useWorldStore } from '../../stores/world'

// Classes
import World from '../scripts/World'
import Character from '../scripts/Character'

export default class PlayScene extends Scene {
  constructor() {
    super({ key: 'PlayScene' })

    this.player = null
  }

  create() {
    const worldStore = useWorldStore()
    const { width, height } = worldStore.world

    // Add background
    const world = new World({ scene: this })

    // Add player
    this.player = new Character({ scene: this, x: 1000, y: 1000 })

    // Set camera
    this.cameras.main.setBounds(0, 0, width, height)
    this.physics.world.setBounds(0, 0, width, height)
    this.cameras.main.startFollow(this.player.sprite, false, 0.09, 0.09)

    this.cameras.main.setZoom(1)
  }

  update() {
    this.player.move()
  }
}

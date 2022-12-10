import { Scene } from 'phaser'
import { useWorldStore } from '../../stores/world'

export default class PlayScene extends Scene {
  constructor() {
    super({ key: 'PlayScene' })

    this.cursor = null
    this.player = null
  }

  create() {
    const worldStore = useWorldStore()
    const { width, height } = worldStore.world

    // Add background
    this.add.grid(0, 0, width, height, 32, 32, 0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle().setOrigin(0)

    // Set keyboard cursors
    this.cursor = this.input.keyboard.createCursorKeys()

    // Add player
    this.player = this.physics.add.sprite(1000, 1000, 'character')

    this.player.setCollideWorldBounds(true)
    this.player.body.onWorldBounds = true // enable worldbounds collision event

    // Set camera
    this.cameras.main.setBounds(0, 0, width * 2, height * 2)
    this.physics.world.setBounds(0, 0, width * 2, height * 2)
    this.cameras.main.startFollow(this.player, false, 0.09, 0.09)

    this.cameras.main.setZoom(1)
  }

  update() {
    this.player.setVelocity(0)

    this.playerMovement()
    this.playerAnimation()
  }

  playerMovement() {
    const left = this.cursor.left.isDown
    const right = this.cursor.right.isDown
    const up = this.cursor.up.isDown
    const down = this.cursor.down.isDown

    if (left) {
      this.player.setVelocityX(-300)
    }
    if (right) {
      this.player.setVelocityX(300)
    }
    if (up) {
      this.player.setVelocityY(-300)
    }
    if (down) {
      this.player.setVelocityY(300)
    }

    //
  }

  playerAnimation() {
    const left = this.cursor.left.isDown
    const right = this.cursor.right.isDown
    const up = this.cursor.up.isDown
    const down = this.cursor.down.isDown

    if (up && left) {
      this.player.anims.play('run_up_left', true)
      return
    }
    if (up && right) {
      this.player.anims.play('run_up_right', true)
      return
    }
    if (down && left) {
      this.player.anims.play('run_down_left', true)
      return
    }
    if (down && right) {
      this.player.anims.play('run_down_right', true)
      return
    }
    if (left) {
      this.player.anims.play('run_left', true)
      return
    }
    if (right) {
      this.player.anims.play('run_right', true)
      return
    }
    if (up) {
      this.player.anims.play('run_up', true)
      return
    }
    if (down) {
      this.player.anims.play('run_down', true)
      return
    }

    this.player.anims.play('idle', true)
  }
}

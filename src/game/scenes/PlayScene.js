import { Scene } from 'phaser'

export default class PlayScene extends Scene {
  constructor() {
    super({ key: 'PlayScene' })

    this.cursor = null
    this.player = null
  }

  create() {
    // Add background
    this.add.image(400, 300, 'sky')

    // Set keyboard cursors
    this.cursor = this.input.keyboard.createCursorKeys()

    // Add player
    this.player = this.physics.add.sprite(400, 200, 'bomb')
    this.player.setCollideWorldBounds(true)
    this.player.body.onWorldBounds = true // enable worldbounds collision event

    // Set camera
    this.cameras.main.setBounds(0, 0, 1024, 2048)
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09)

    this.cameras.main.setZoom(0.5)
  }

  update() {
    this.player.setVelocity(0)

    if (this.cursor.left.isDown) {
      this.player.setVelocityX(-300)
    } else if (this.cursor.right.isDown) {
      this.player.setVelocityX(300)
    }

    if (this.cursor.up.isDown) {
      this.player.setVelocityY(-300)
    } else if (this.cursor.down.isDown) {
      this.player.setVelocityY(300)
    }
  }
}

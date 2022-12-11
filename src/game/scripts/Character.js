export default class World {
  constructor({ scene, x, y }) {
    this.scene = scene
    this.x = x
    this.y = y
    this.sprite = null

    this.createCharacter()
  }

  createCharacter() {
    this.sprite = this.scene.physics.add.sprite(this.x, this.y, 'character').setCollideWorldBounds(true)
    this.sprite.body.setSize(96, 116).setOffset(80, 326)
    this.sprite.body.onWorldBounds = true // enable worldbounds collision event
  }

  move() {
    this.sprite.setVelocity(0)

    this.playerMovement()
    this.playerAnimation()
  }

  playerMovement() {
    const cursor = this.scene.input.keyboard.createCursorKeys()
    const left = cursor.left.isDown
    const right = cursor.right.isDown
    const up = cursor.up.isDown
    const down = cursor.down.isDown

    if (left) {
      this.sprite.setVelocityX(-300)
    }
    if (right) {
      this.sprite.setVelocityX(300)
    }
    if (up) {
      this.sprite.setVelocityY(-300)
    }
    if (down) {
      this.sprite.setVelocityY(300)
    }

    //
  }

  playerAnimation() {
    // Set keyboard cursors
    const cursor = this.scene.input.keyboard.createCursorKeys()
    const left = cursor.left.isDown
    const right = cursor.right.isDown
    const up = cursor.up.isDown
    const down = cursor.down.isDown

    if (up && left) {
      this.sprite.anims.play('run_up_left', true)
      return
    }
    if (up && right) {
      this.sprite.anims.play('run_up_right', true)
      return
    }
    if (down && left) {
      this.sprite.anims.play('run_down_left', true)
      return
    }
    if (down && right) {
      this.sprite.anims.play('run_down_right', true)
      return
    }
    if (left) {
      this.sprite.anims.play('run_left', true)
      return
    }
    if (right) {
      this.sprite.anims.play('run_right', true)
      return
    }
    if (up) {
      this.sprite.anims.play('run_up', true)
      return
    }
    if (down) {
      this.sprite.anims.play('run_down', true)
      return
    }

    this.sprite.anims.play('idle', true)
  }
}

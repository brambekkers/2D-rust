import { Scene } from 'phaser'
import sky from '../assets/sky.png'
import characterSpritesheet from '../assets/characters/male/spritesheet.png'

export default class BootScene extends Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  preload() {
    this.load.image('sky', sky)
    // this.load.image('character', characterSpritesheet)
    this.load.spritesheet('character', characterSpritesheet, { frameWidth: 256, frameHeight: 512 })
  }

  create() {
    this.scene.start('PlayScene')
    this.createCharacterAnims(this)
  }

  createCharacterAnims() {
    const runningFrameRate = 12
    this.anims.create({
      key: 'idle',
      frames: [{ key: 'character', frame: 66 }],
      frameRate: 1
    })
    this.anims.create({
      key: 'run_left',
      frames: this.anims.generateFrameNumbers('character', { start: 122, end: 131 }),
      frameRate: runningFrameRate,
      repeat: -1
    })
    this.anims.create({
      key: 'run_right',
      frames: this.anims.generateFrameNumbers('character', { frames: [33, 34, 35, 36, 38, 39, 40, 41, 42, 43] }),
      frameRate: runningFrameRate,
      repeat: -1
    })
    this.anims.create({
      key: 'run_up',
      frames: this.anims.generateFrameNumbers('character', { frames: [166, 167, 168, 169, 18, 37, 56, 75, 94, 113] }),
      frameRate: runningFrameRate,
      repeat: -1
    })
    this.anims.create({
      key: 'run_down',
      frames: this.anims.generateFrameNumbers('character', { start: 78, end: 87 }),
      frameRate: runningFrameRate,
      repeat: -1
    })
    this.anims.create({
      key: 'run_down_left',
      frames: this.anims.generateFrameNumbers('character', { start: 100, end: 109 }),
      frameRate: runningFrameRate,
      repeat: -1
    })
    this.anims.create({
      key: 'run_down_right',
      frames: this.anims.generateFrameNumbers('character', { frames: [55, 57, 58, 59, 60, 61, 62, 63, 64, 65] }),
      frameRate: runningFrameRate,
      repeat: -1
    })
    this.anims.create({
      key: 'run_up_right',
      frames: this.anims.generateFrameNumbers('character', { frames: [11, 12, 13, 14, 15, 16, 17, 19, 20, 21] }),
      frameRate: runningFrameRate,
      repeat: -1
    })
    this.anims.create({
      key: 'run_up_left',
      frames: this.anims.generateFrameNumbers('character', {
        frames: [144, 145, 146, 147, 148, 149, 150, 152, 153, 154]
      }),
      frameRate: runningFrameRate,
      repeat: -1
    })
  }
}

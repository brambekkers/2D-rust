import { Scene } from 'phaser'
import floorSpritesheet from '../assets/floor/spritesheet.png'

export default class WorldLoader extends Scene {
  constructor() {
    super({ key: 'WorldLoader' })
  }

  preload() {
    this.load.spritesheet('floorSpritesheet', floorSpritesheet, { frameWidth: 256, frameHeight: 512 })
  }

  create() {
    this.scene.start('CharacterLoader')
  }
}

import spritesheetData from '../assets/floor/spritesheetData'
import { useWorldStore } from '../../stores/world'

export default class World {
  constructor({ scene }) {
    this.scene = scene
    this.pool = []
    this.createTilePool()
    this.createTiles()
  }

  createTilePool() {
    const worldStore = useWorldStore()
    const { xTiles, yTiles } = worldStore.world

    const amountOfTiles = xTiles * yTiles
    for (const key in spritesheetData) {
      const data = spritesheetData[key]
      for (let i = 0; i < data.probability * amountOfTiles; i++) {
        this.pool.push(data.i)
      }
    }
  }
  createTiles() {
    const worldStore = useWorldStore()
    const { width, height, xTiles, yTiles } = worldStore.world

    // Add background to show the world bounds
    this.scene.add.grid(0, 0, width, height, 32, 32, 0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle().setOrigin(0)

    // const [imgIndex] = this.pool.splice(Math.floor(Math.random() * this.pool.length), 1)

    for (let yRow = 0; yRow < yTiles; yRow++) {
      for (let xRow = 0; xRow < xTiles; xRow++) {
        const x = xRow * 256 + (yRow % 2 === 1 ? 0 : 128)
        const y = yRow * 64
        const [imgIndex] = this.pool.splice(Math.floor(Math.random() * this.pool.length), 1)
        this.scene.add.sprite(x, y, 'floorSpritesheet', imgIndex).setOrigin(1)
      }
    }
  }
}

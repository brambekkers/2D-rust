import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'

import { useWorldStore } from '../stores/world'

const worldStore = useWorldStore()
const { width, height } = worldStore.world
console.log(window.innerWidth)
function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent: containerId,
    scale: {
      parent: containerId,
      width: window.innerWidth,
      height: window.innerHeight
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    },
    scene: [BootScene, PlayScene]
  })
}

export default launch
export { launch }

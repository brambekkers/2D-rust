import Phaser from 'phaser'
import WorldLoader from './scenes/WorldLoader'
import CharacterLoader from './scenes/CharacterLoader'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'

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
    scene: [WorldLoader, CharacterLoader, BootScene, PlayScene]
  })
}

export default launch
export { launch }

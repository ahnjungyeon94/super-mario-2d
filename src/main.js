import Phaser from 'phaser'
import BootScene from './scenes/BootScene.js'
import MenuScene from './scenes/MenuScene.js'
import CharacterSelectScene from './scenes/CharacterSelectScene.js'
import GameScene from './scenes/GameScene.js'
import GameOverScene from './scenes/GameOverScene.js'

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  backgroundColor: '#5c94fc',
  dom: { createContainer: true },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      debug: false
    }
  },
  scene: [BootScene, MenuScene, CharacterSelectScene, GameScene, GameOverScene]
}

new Phaser.Game(config)

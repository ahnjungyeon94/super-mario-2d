import Phaser from 'phaser'

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene')
  }

  create() {
    const { width, height } = this.scale

    // Title
    this.add.text(width / 2, 160, 'SUPER MARIO', {
      fontSize: '56px',
      fontFamily: 'Arial Black, Arial',
      color: '#ffffff',
      stroke: '#cc0000',
      strokeThickness: 6
    }).setOrigin(0.5)

    this.add.text(width / 2, 230, '2D ADVENTURE', {
      fontSize: '22px',
      fontFamily: 'Arial',
      color: '#ffdd00',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5)

    // PLAY button
    const playBtn = this.add.text(width / 2, 360, '▶  PLAY', {
      fontSize: '32px',
      fontFamily: 'Arial Black, Arial',
      color: '#ffffff',
      backgroundColor: '#cc0000',
      padding: { x: 24, y: 12 },
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5).setInteractive({ useHandCursor: true })

    playBtn.on('pointerover', () => playBtn.setStyle({ backgroundColor: '#ff2200' }))
    playBtn.on('pointerout',  () => playBtn.setStyle({ backgroundColor: '#cc0000' }))
    playBtn.on('pointerup',   () => this.scene.start('CharacterSelectScene'))

    // MULTIPLAYER button (disabled)
    this.add.text(width / 2, 450, '👥  MULTIPLAYER  (준비 중)', {
      fontSize: '22px',
      fontFamily: 'Arial',
      color: '#888888',
      backgroundColor: '#333333',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5)

    // Enter key shortcut
    this.input.keyboard.once('keydown-ENTER', () => this.scene.start('CharacterSelectScene'))
    this.input.keyboard.once('keydown-SPACE', () => this.scene.start('CharacterSelectScene'))
  }
}

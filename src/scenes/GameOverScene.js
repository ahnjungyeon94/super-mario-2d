import Phaser from 'phaser'

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene')
  }

  init(data) {
    this.cleared   = data.cleared   ?? false
    this.score     = data.score     ?? 0
    this.nickname  = data.nickname  ?? '플레이어'
    this.character = data.character ?? 'mario'
  }

  create() {
    const { width, height } = this.scale

    const title = this.cleared ? 'LEVEL CLEAR! 🎉' : 'GAME OVER'
    const titleColor = this.cleared ? '#ffdd00' : '#ff4444'

    this.add.text(width / 2, 160, title, {
      fontSize: '52px',
      fontFamily: 'Arial Black, Arial',
      color: titleColor,
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5)

    // Character sprite
    this.add.image(width / 2, 270, `${this.character}_idle`).setScale(4)

    // Nickname
    this.add.text(width / 2, 330, this.nickname, {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5)

    // Score
    this.add.text(width / 2, 370, `SCORE: ${this.score}`, {
      fontSize: '30px',
      fontFamily: 'Arial Black, Arial',
      color: '#ffdd00',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5)

    // Play again button
    const btn = this.add.text(width / 2, 460, '다시 하기', {
      fontSize: '28px',
      fontFamily: 'Arial Black, Arial',
      color: '#ffffff',
      backgroundColor: '#cc0000',
      padding: { x: 24, y: 12 },
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5).setInteractive({ useHandCursor: true })

    btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#ff2200' }))
    btn.on('pointerout',  () => btn.setStyle({ backgroundColor: '#cc0000' }))
    btn.on('pointerup',   () => this.scene.start('CharacterSelectScene'))

    // Menu button
    const menuBtn = this.add.text(width / 2, 530, '메인 메뉴', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#aaaaaa'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true })

    menuBtn.on('pointerup', () => this.scene.start('MenuScene'))

    this.input.keyboard.once('keydown-ENTER', () => this.scene.start('CharacterSelectScene'))
    this.input.keyboard.once('keydown-SPACE', () => this.scene.start('CharacterSelectScene'))
  }
}

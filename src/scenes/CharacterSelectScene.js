import Phaser from 'phaser'

const CHARS = [
  { key: 'mario',       label: '마리오', color: '#cc0000' },
  { key: 'luigi',       label: '루이지', color: '#007700' },
  { key: 'anjeongyeon', label: '안정연',  color: '#7B4A2A' },
  { key: 'sinchaeha',   label: '신채하',  color: '#7B1010' }
]

export default class CharacterSelectScene extends Phaser.Scene {
  constructor() {
    super('CharacterSelectScene')
    this.selectedIndex = 0
    this.cards = []
  }

  create() {
    const { width, height } = this.scale
    this.selectedIndex = 0
    this.cards = []

    this.add.text(width / 2, 60, '캐릭터 선택', {
      fontSize: '36px',
      fontFamily: 'Arial Black, Arial',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5)

    // Character cards — 4 characters evenly spaced
    const positions = [110, 280, 450, 630]
    CHARS.forEach((char, i) => {
      const x = positions[i]
      const y = 240

      const border = this.add.rectangle(x, y, 120, 180, 0x000000, 0.4)
        .setStrokeStyle(4, i === 0 ? 0xffdd00 : 0x444444)

      const sprite = this.add.image(x, y - 20, `${char.key}_idle`)
        .setScale(2.5)

      const label = this.add.text(x, y + 68, char.label, {
        fontSize: '18px',
        fontFamily: 'Arial Black, Arial',
        color: char.color,
        stroke: '#000000',
        strokeThickness: 3
      }).setOrigin(0.5)

      border.setInteractive({ useHandCursor: true })
      border.on('pointerup', () => this.selectChar(i))

      this.cards.push({ border, sprite, label })
    })

    // Nickname input via Phaser DOM
    const domEl = this.add.dom(width / 2, 390).createFromHTML(`
      <div style="text-align:center">
        <div style="color:#ffffff;font-family:Arial;font-size:16px;margin-bottom:6px">닉네임</div>
        <input id="nicknameInput" type="text" maxlength="12"
          placeholder="입력 (최대 12자)"
          style="font-size:18px;padding:8px 12px;border:3px solid #ffffff;
                 background:rgba(0,0,0,0.7);color:#ffffff;text-align:center;
                 outline:none;width:220px;border-radius:4px;font-family:Arial">
      </div>
    `)

    this.nicknameInput = domEl.node.querySelector('#nicknameInput')

    // START button
    const startBtn = this.add.text(width / 2, 480, 'START ▶', {
      fontSize: '30px',
      fontFamily: 'Arial Black, Arial',
      color: '#ffffff',
      backgroundColor: '#228800',
      padding: { x: 28, y: 12 },
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5).setInteractive({ useHandCursor: true })

    startBtn.on('pointerover', () => startBtn.setStyle({ backgroundColor: '#33bb00' }))
    startBtn.on('pointerout',  () => startBtn.setStyle({ backgroundColor: '#228800' }))
    startBtn.on('pointerup',   () => this.startGame())

    // Keyboard navigation
    this.cursors = this.input.keyboard.createCursorKeys()
    this.input.keyboard.on('keydown-LEFT',  () => this.selectChar((this.selectedIndex - 1 + CHARS.length) % CHARS.length))
    this.input.keyboard.on('keydown-RIGHT', () => this.selectChar((this.selectedIndex + 1) % CHARS.length))
    this.input.keyboard.on('keydown-ENTER', () => this.startGame())

    // Back button
    this.add.text(20, 20, '← 뒤로', {
      fontSize: '18px',
      fontFamily: 'Arial',
      color: '#cccccc'
    }).setInteractive({ useHandCursor: true }).on('pointerup', () => {
      domEl.destroy()
      this.scene.start('MenuScene')
    })
  }

  selectChar(index) {
    this.selectedIndex = index
    this.cards.forEach((card, i) => {
      card.border.setStrokeStyle(4, i === index ? 0xffdd00 : 0x444444)
    })
  }

  startGame() {
    const nickname = (this.nicknameInput?.value || '').trim() || '플레이어'
    const character = CHARS[this.selectedIndex].key
    this.scene.start('GameScene', { character, nickname })
  }
}

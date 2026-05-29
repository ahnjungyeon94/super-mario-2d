import Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene')
  }

  create() {
    this.makeCharacter('mario', 0xcc0000, 0xcc0000)
    this.makeCharacter('luigi', 0x007700, 0x007700)
    this.makeGoomba()
    this.makeGroundTile()
    this.makePlatformTile()
    this.makeQuestionBlock()
    this.makeUsedBlock()
    this.makeCoin()
    this.makePole()
    this.makeFlag()
    this.scene.start('MenuScene')
  }

  makeCharacter(name, hatColor, shirtColor) {
    const states = ['idle', 'walk1', 'walk2', 'jump']
    states.forEach(state => {
      const g = this.make.graphics({ add: false })
      this._drawChar(g, 0, 0, hatColor, shirtColor, state)
      g.generateTexture(`${name}_${state}`, 32, 48)
      g.destroy()
    })
  }

  _drawChar(g, ox, oy, hatColor, shirtColor, state) {
    // Hat crown
    g.fillStyle(hatColor, 1)
    g.fillRect(ox + 8, oy + 0, 16, 8)
    // Hat brim
    g.fillRect(ox + 2, oy + 8, 28, 4)

    // Face
    g.fillStyle(0xffcc99, 1)
    g.fillRect(ox + 4, oy + 12, 24, 12)

    // Eyes
    g.fillStyle(0x000000, 1)
    g.fillRect(ox + 7,  oy + 14, 5, 5)
    g.fillRect(ox + 20, oy + 14, 5, 5)

    // Mustache
    g.fillStyle(0x441100, 1)
    g.fillRect(ox + 5,  oy + 21, 9, 3)
    g.fillRect(ox + 18, oy + 21, 9, 3)

    // Shirt
    g.fillStyle(shirtColor, 1)
    g.fillRect(ox + 4, oy + 24, 24, 10)

    // Overall bib
    g.fillStyle(0x0044cc, 1)
    g.fillRect(ox + 10, oy + 24, 5, 10)
    g.fillRect(ox + 17, oy + 24, 5, 10)

    // Arms
    g.fillStyle(shirtColor, 1)
    if (state === 'jump') {
      g.fillRect(ox + 0,  oy + 22, 4, 8)
      g.fillRect(ox + 28, oy + 22, 4, 8)
    } else {
      g.fillRect(ox + 0,  oy + 26, 4, 8)
      g.fillRect(ox + 28, oy + 26, 4, 8)
    }

    // Overalls pants
    g.fillStyle(0x0044cc, 1)
    g.fillRect(ox + 4, oy + 34, 24, 6)

    // Legs + shoes
    if (state === 'walk1') {
      g.fillRect(ox + 4,  oy + 40, 10, 4)
      g.fillRect(ox + 18, oy + 40, 10, 6)
      g.fillStyle(0x662200, 1)
      g.fillRect(ox + 2,  oy + 42, 13, 4)
      g.fillRect(ox + 16, oy + 44, 14, 4)
    } else if (state === 'walk2') {
      g.fillRect(ox + 4,  oy + 40, 10, 6)
      g.fillRect(ox + 18, oy + 40, 10, 4)
      g.fillStyle(0x662200, 1)
      g.fillRect(ox + 2,  oy + 44, 14, 4)
      g.fillRect(ox + 16, oy + 42, 13, 4)
    } else {
      g.fillRect(ox + 4,  oy + 40, 10, 4)
      g.fillRect(ox + 18, oy + 40, 10, 4)
      g.fillStyle(0x662200, 1)
      g.fillRect(ox + 2,  oy + 44, 14, 4)
      g.fillRect(ox + 16, oy + 44, 14, 4)
    }
  }

  makeGoomba() {
    ['goomba1', 'goomba2'].forEach((key, i) => {
      const g = this.make.graphics({ add: false })

      // Body
      g.fillStyle(0x993300, 1)
      g.fillRect(2, 4, 24, 20)
      // Cap (rounded top)
      g.fillRect(0, 8, 28, 12)
      g.fillRect(4, 4, 20, 4)

      // Face area
      g.fillStyle(0xcc6633, 1)
      g.fillRect(2, 14, 24, 10)

      // Eyes
      g.fillStyle(0xffffff, 1)
      g.fillRect(4, 14, 8, 8)
      g.fillRect(16, 14, 8, 8)

      g.fillStyle(0x000000, 1)
      if (i === 0) {
        g.fillRect(4,  15, 6, 6)
        g.fillRect(18, 15, 6, 6)
        // Angry brow
        g.fillRect(4,  13, 8, 2)
        g.fillRect(16, 12, 8, 2)
      } else {
        g.fillRect(6,  15, 6, 6)
        g.fillRect(16, 15, 6, 6)
        g.fillRect(4,  12, 8, 2)
        g.fillRect(16, 13, 8, 2)
      }

      // Feet
      g.fillStyle(0x662200, 1)
      if (i === 0) {
        g.fillRect(2,  24, 8, 4)
        g.fillRect(18, 22, 8, 4)
      } else {
        g.fillRect(2,  22, 8, 4)
        g.fillRect(18, 24, 8, 4)
      }

      g.generateTexture(key, 28, 28)
      g.destroy()
    })
  }

  makeGroundTile() {
    const g = this.make.graphics({ add: false })
    g.fillStyle(0xaa6622, 1)
    g.fillRect(0, 0, 32, 32)
    // Grass top
    g.fillStyle(0x44bb00, 1)
    g.fillRect(0, 0, 32, 7)
    g.fillStyle(0x66dd22, 1)
    g.fillRect(0, 0, 32, 3)
    // Subtle brick line
    g.fillStyle(0x884411, 1)
    g.fillRect(0, 15, 32, 1)
    g.generateTexture('ground', 32, 32)
    g.destroy()
  }

  makePlatformTile() {
    const g = this.make.graphics({ add: false })
    g.fillStyle(0xcc8844, 1)
    g.fillRect(0, 0, 32, 32)
    g.fillStyle(0x996633, 1)
    // Border
    g.fillRect(0,  0,  32, 3)
    g.fillRect(0,  29, 32, 3)
    g.fillRect(0,  0,  3,  32)
    g.fillRect(29, 0,  3,  32)
    // Brick cross pattern
    g.fillRect(3,  14, 26, 2)
    g.fillRect(14, 3,  2,  11)
    g.fillRect(19, 16, 2,  13)
    g.generateTexture('platform', 32, 32)
    g.destroy()
  }

  makeQuestionBlock() {
    const g = this.make.graphics({ add: false })
    g.fillStyle(0xffcc00, 1)
    g.fillRect(0, 0, 32, 32)
    g.fillStyle(0xcc9900, 1)
    g.fillRect(0,  0,  32, 3)
    g.fillRect(0,  29, 32, 3)
    g.fillRect(0,  0,  3,  32)
    g.fillRect(29, 0,  3,  32)
    // "?" shape in white
    g.fillStyle(0xffffff, 1)
    g.fillRect(10, 6,  12, 3)   // top of ?
    g.fillRect(19, 9,  4,  5)   // right curve
    g.fillRect(10, 12, 12, 3)   // middle bar
    g.fillRect(10, 14, 4,  5)   // stem
    g.fillRect(13, 22, 6,  6)   // dot
    g.generateTexture('qblock', 32, 32)
    g.destroy()
  }

  makeUsedBlock() {
    const g = this.make.graphics({ add: false })
    g.fillStyle(0x888888, 1)
    g.fillRect(0, 0, 32, 32)
    g.fillStyle(0x666666, 1)
    g.fillRect(0,  0,  32, 3)
    g.fillRect(0,  29, 32, 3)
    g.fillRect(0,  0,  3,  32)
    g.fillRect(29, 0,  3,  32)
    g.fillRect(3,  14, 26, 2)
    g.generateTexture('used_block', 32, 32)
    g.destroy()
  }

  makeCoin() {
    const g = this.make.graphics({ add: false })
    g.fillStyle(0xffdd00, 1)
    g.fillCircle(8, 8, 7)
    g.fillStyle(0xffaa00, 1)
    g.fillCircle(8, 8, 4)
    g.fillStyle(0xffff88, 1)
    g.fillRect(6, 3, 3, 7)
    g.generateTexture('coin', 16, 16)
    g.destroy()
  }

  makePole() {
    const g = this.make.graphics({ add: false })
    g.fillStyle(0x888888, 1)
    g.fillRect(0, 0, 8, 480)
    g.fillStyle(0xbbbbbb, 1)
    g.fillRect(2, 0, 3, 480)
    g.generateTexture('pole', 8, 480)
    g.destroy()
  }

  makeFlag() {
    const g = this.make.graphics({ add: false })
    g.fillStyle(0x00cc00, 1)
    g.fillRect(0, 0, 24, 16)
    g.fillStyle(0x009900, 1)
    g.fillRect(0, 0, 12, 8)
    g.generateTexture('flag_img', 24, 16)
    g.destroy()
  }
}

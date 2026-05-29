import Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene')
  }

  create() {
    this.makeCharacter('mario', 0xcc0000, 0xcc0000)
    this.makeCharacter('luigi', 0x007700, 0x007700)
    this.makeAnjeongyeon()
    this.makeSinchaeha()
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

  // ─── 안정연: 격투기 선수 ─────────────────────────────────────────────────────

  makeAnjeongyeon() {
    ['idle', 'walk1', 'walk2', 'jump'].forEach(state => {
      const g = this.make.graphics({ add: false })
      this._drawFighter(g, 0, 0, state)
      g.generateTexture(`anjeongyeon_${state}`, 32, 48)
      g.destroy()
    })
  }

  _drawFighter(g, ox, oy, state) {
    const SKIN = 0x7B4A2A   // 짙은 피부
    const HAIR = 0x150800   // 검은 머리 (짧게)
    const GI   = 0xffffff   // 흰 도복
    const BELT = 0x0a0a0a   // 검은 띠
    const EYE  = 0x000000

    // 짧은 머리
    g.fillStyle(HAIR, 1)
    g.fillRect(ox + 4, oy + 0,  24, 8)
    g.fillRect(ox + 2, oy + 4,  28, 6)

    // 얼굴 (강인한 턱선)
    g.fillStyle(SKIN, 1)
    g.fillRect(ox + 4,  oy + 10, 24, 12)
    g.fillRect(ox + 2,  oy + 18, 28, 6)

    // 눈 (날카롭게)
    g.fillStyle(EYE, 1)
    g.fillRect(ox + 7,  oy + 12, 7, 3)
    g.fillRect(ox + 18, oy + 12, 7, 3)

    // 코 (돌출된)
    g.fillStyle(0x5A3520, 1)
    g.fillRect(ox + 14, oy + 16, 4, 4)

    // 도복 상의 (넓은 어깨)
    g.fillStyle(GI, 1)
    g.fillRect(ox + 0,  oy + 24, 32, 12)

    // V넥 칼라 (피부색)
    g.fillStyle(SKIN, 1)
    g.fillRect(ox + 12, oy + 24, 8, 7)

    // 검은 띠
    g.fillStyle(BELT, 1)
    g.fillRect(ox + 0,  oy + 36, 32, 4)

    // 팔 동작
    g.fillStyle(GI, 1)
    if (state === 'jump') {
      // 펀치 자세: 오른손 앞으로
      g.fillRect(ox + 0,  oy + 24, 4, 10)
      g.fillRect(ox + 28, oy + 20, 4, 8)
      g.fillStyle(SKIN, 1)
      g.fillRect(ox + 0,  oy + 32, 4, 4)
      g.fillRect(ox + 28, oy + 18, 4, 4)
    } else {
      g.fillRect(ox + 0,  oy + 26, 4, 10)
      g.fillRect(ox + 28, oy + 26, 4, 10)
      g.fillStyle(SKIN, 1)
      g.fillRect(ox + 0,  oy + 34, 4, 4)
      g.fillRect(ox + 28, oy + 34, 4, 4)
    }

    // 도복 하의 + 발
    g.fillStyle(GI, 1)
    if (state === 'walk1') {
      g.fillRect(ox + 2,  oy + 40, 12, 5)
      g.fillRect(ox + 18, oy + 40, 12, 7)
      g.fillStyle(SKIN, 1)
      g.fillRect(ox + 0,  oy + 43, 14, 5)
      g.fillRect(ox + 16, oy + 45, 14, 3)
    } else if (state === 'walk2') {
      g.fillRect(ox + 2,  oy + 40, 12, 7)
      g.fillRect(ox + 18, oy + 40, 12, 5)
      g.fillStyle(SKIN, 1)
      g.fillRect(ox + 0,  oy + 45, 14, 3)
      g.fillRect(ox + 16, oy + 43, 14, 5)
    } else if (state === 'jump') {
      // 발차기: 오른발 앞으로 뻗음
      g.fillRect(ox + 2,  oy + 40, 12, 4)
      g.fillRect(ox + 16, oy + 37, 16, 4)
      g.fillStyle(SKIN, 1)
      g.fillRect(ox + 0,  oy + 42, 12, 4)
      g.fillRect(ox + 14, oy + 35, 18, 4)
    } else {
      g.fillRect(ox + 2,  oy + 40, 12, 4)
      g.fillRect(ox + 18, oy + 40, 12, 4)
      g.fillStyle(SKIN, 1)
      g.fillRect(ox + 0,  oy + 42, 14, 4)
      g.fillRect(ox + 16, oy + 42, 14, 4)
    }
  }

  // ─── 신채하: 미술학원 원장 ────────────────────────────────────────────────────

  makeSinchaeha() {
    ['idle', 'walk1', 'walk2', 'jump'].forEach(state => {
      const g = this.make.graphics({ add: false })
      this._drawArtist(g, 0, 0, state)
      g.generateTexture(`sinchaeha_${state}`, 32, 48)
      g.destroy()
    })
  }

  _drawArtist(g, ox, oy, state) {
    const SKIN  = 0xffe8d0   // 밝은 피부
    const BERET = 0x7B1010   // 진한 빨간 베레모
    const HAIR  = 0xC47B50   // 밝은 갈색 머리
    const SMOCK = 0xd4eef8   // 하늘색 앞치마
    const PANTS = 0x5577aa   // 청바지
    const SHOES = 0xaaaaaa   // 회색 신발
    const EYE   = 0x3A2820   // 갈색 눈

    // 베레모
    g.fillStyle(BERET, 1)
    g.fillRect(ox + 6,  oy + 0,  20, 5)
    g.fillRect(ox + 2,  oy + 4,  28, 4)
    g.fillRect(ox + 24, oy + 2,  6,  4)   // 베레모 포인트

    // 머리카락 (양옆으로 흘러내림)
    g.fillStyle(HAIR, 1)
    g.fillRect(ox + 2,  oy + 8,  5,  14)
    g.fillRect(ox + 25, oy + 8,  5,  14)

    // 얼굴 (밝고 섬세)
    g.fillStyle(SKIN, 1)
    g.fillRect(ox + 6,  oy + 8,  20, 14)

    // 눈 (크고 예술적)
    g.fillStyle(EYE, 1)
    g.fillRect(ox + 9,  oy + 11, 5, 5)
    g.fillRect(ox + 18, oy + 11, 5, 5)

    // 눈 하이라이트
    g.fillStyle(0xffffff, 1)
    g.fillRect(ox + 11, oy + 12, 2, 2)
    g.fillRect(ox + 20, oy + 12, 2, 2)

    // 입 (살짝 미소)
    g.fillStyle(0xdd9988, 1)
    g.fillRect(ox + 11, oy + 19, 10, 2)

    // 미술 앞치마 (흰 셔츠 위에)
    g.fillStyle(0xffffff, 1)
    g.fillRect(ox + 6, oy + 22, 20, 16)    // 흰 셔츠

    g.fillStyle(SMOCK, 1)
    g.fillRect(ox + 8, oy + 24, 16, 14)    // 앞치마

    // 물감 얼룩들
    g.fillStyle(0xff6655, 1)
    g.fillRect(ox + 10, oy + 26, 3, 3)
    g.fillStyle(0x55bb77, 1)
    g.fillRect(ox + 18, oy + 28, 3, 3)
    g.fillStyle(0x5577ff, 1)
    g.fillRect(ox + 13, oy + 32, 3, 3)
    g.fillStyle(0xffcc44, 1)
    g.fillRect(ox + 20, oy + 25, 3, 3)

    // 팔 + 붓 (오른손)
    g.fillStyle(0xffffff, 1)
    if (state === 'jump') {
      // 팔레트 들고 점프
      g.fillRect(ox + 0,  oy + 22, 4, 10)
      g.fillRect(ox + 28, oy + 22, 4, 10)
      g.fillStyle(SKIN, 1)
      g.fillRect(ox + 0,  oy + 20, 4, 4)
      g.fillRect(ox + 28, oy + 20, 4, 4)
      // 팔레트
      g.fillStyle(0xffee88, 1)
      g.fillRect(ox + 0,  oy + 14, 8, 6)
      g.fillStyle(0xff4444, 1)
      g.fillRect(ox + 1,  oy + 15, 2, 2)
      g.fillStyle(0x4488ff, 1)
      g.fillRect(ox + 4,  oy + 15, 2, 2)
      g.fillStyle(0x44cc44, 1)
      g.fillRect(ox + 1,  oy + 17, 2, 2)
    } else {
      g.fillRect(ox + 0,  oy + 24, 4, 12)
      g.fillRect(ox + 28, oy + 24, 4, 12)
      g.fillStyle(SKIN, 1)
      g.fillRect(ox + 0,  oy + 34, 4, 4)
      g.fillRect(ox + 28, oy + 34, 4, 4)
      // 붓 (오른손에)
      g.fillStyle(0x996633, 1)
      g.fillRect(ox + 28, oy + 24, 4, 14)
      g.fillStyle(0x222222, 1)
      g.fillRect(ox + 28, oy + 22, 4, 3)
    }

    // 바지
    g.fillStyle(PANTS, 1)
    g.fillRect(ox + 4, oy + 38, 24, 6)

    // 다리 + 신발
    if (state === 'walk1') {
      g.fillRect(ox + 4,  oy + 40, 10, 4)
      g.fillRect(ox + 18, oy + 40, 10, 6)
      g.fillStyle(SHOES, 1)
      g.fillRect(ox + 2,  oy + 42, 13, 4)
      g.fillRect(ox + 16, oy + 44, 13, 4)
    } else if (state === 'walk2') {
      g.fillRect(ox + 4,  oy + 40, 10, 6)
      g.fillRect(ox + 18, oy + 40, 10, 4)
      g.fillStyle(SHOES, 1)
      g.fillRect(ox + 2,  oy + 44, 13, 4)
      g.fillRect(ox + 16, oy + 42, 13, 4)
    } else {
      g.fillRect(ox + 4,  oy + 40, 10, 4)
      g.fillRect(ox + 18, oy + 40, 10, 4)
      g.fillStyle(SHOES, 1)
      g.fillRect(ox + 2,  oy + 44, 13, 4)
      g.fillRect(ox + 16, oy + 44, 13, 4)
    }
  }
}

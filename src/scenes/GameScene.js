import Phaser from 'phaser'
import Player from '../entities/Player.js'
import Goomba from '../entities/Goomba.js'
import Coin from '../entities/Coin.js'
import QuestionBlock from '../objects/QuestionBlock.js'
import MobileControls from '../ui/MobileControls.js'
import {
  TILE, WORLD_WIDTH, WORLD_HEIGHT, GROUND_TOP,
  GROUND_SEGS, PLATFORMS, QUESTION_BLOCKS, COINS, GOOMBAS, FLAGPOLE
} from '../levels/level1.js'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  init(data) {
    this.selectedCharacter = data.character ?? 'mario'
    this.nickname          = data.nickname  ?? '플레이어'
    this.score             = 0
    this.isMultiplayer     = false
    this.players           = new Map()
    this._goombaEntities   = []
  }

  create() {
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT + 200)
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT)

    this._createLevel()
    this._createPlayer()
    this._createCamera()
    this._createHUD()
    this._setupCollisions()

    this.cursors  = this.input.keyboard.createCursorKeys()
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    // 터치 기기에서만 모바일 컨트롤 생성
    if (this.sys.game.device.input.touch) {
      this.mobileControls = new MobileControls(this)
    }
  }

  update() {
    if (!this.player || this.player.isDead) return

    const touch = this.mobileControls ?? null
    if (touch) touch.update()

    this.player.update(this.cursors, this.spaceKey, touch)

    this._goombaEntities.forEach(g => g.update())

    // Fell off the world
    if (this.player.sprite.y > WORLD_HEIGHT + 100) {
      this.player.die()
    }

    this._updateHUD()
  }

  // ─── Level creation ───────────────────────────────────────────────────────

  _createLevel() {
    this._createGround()
    this._createPlatforms()
    this._createQuestionBlocks()
    this._createCoins()
    this._createGoombas()
    this._createFlagpole()
  }

  _createGround() {
    this.groundGroup = this.physics.add.staticGroup()
    GROUND_SEGS.forEach(({ x, w }) => {
      for (let tx = x; tx < x + w; tx += TILE) {
        this.groundGroup.create(tx + TILE / 2, GROUND_TOP + TILE / 2, 'ground')
      }
    })
    this.groundGroup.refresh()
  }

  _createPlatforms() {
    this.platformGroup = this.physics.add.staticGroup()
    PLATFORMS.forEach(({ x, y, tiles }) => {
      for (let i = 0; i < tiles; i++) {
        this.platformGroup.create(x + i * TILE + TILE / 2, y + TILE / 2, 'platform')
      }
    })
    this.platformGroup.refresh()
  }

  _createQuestionBlocks() {
    this.questionBlocks = []
    this.questionBlockGroup = this.add.group()

    QUESTION_BLOCKS.forEach(({ x, y }) => {
      const block = new QuestionBlock(this, x, y)
      this.questionBlocks.push(block)
      this.questionBlockGroup.add(block.sprite)
    })
  }

  _createCoins() {
    this.coinGroup = this.physics.add.staticGroup()
    COINS.forEach(({ x, y }) => {
      const coin = new Coin(this, x, y, true)
      this.coinGroup.add(coin.sprite)
    })
    this.coinGroup.refresh()
  }

  _createGoombas() {
    this.goombaGroup = this.physics.add.group()

    GOOMBAS.forEach(({ x, y }) => {
      const goomba = new Goomba(this, x, y)
      this._goombaEntities.push(goomba)
      this.goombaGroup.add(goomba.sprite)
    })
  }

  _createFlagpole() {
    const { x, y } = FLAGPOLE
    const poleHeight = y   // top of ground
    const poleTopY   = 80

    // Pole image (tall static body)
    this.flag = this.physics.add.staticSprite(x + 4, poleTopY + 240, 'pole')
    this.flag.body.setSize(8, poleHeight - poleTopY)
    this.flag.body.setOffset(0, 0)
    this.flag.refreshBody()

    // Flag image at top
    this.add.image(x + 16, poleTopY + 8, 'flag_img')

    // Gold ball on top
    const g = this.add.graphics()
    g.fillStyle(0xffdd00, 1)
    g.fillCircle(x + 4, poleTopY, 10)
  }

  // ─── Player ───────────────────────────────────────────────────────────────

  _createPlayer() {
    const spawnX = 100
    const spawnY = GROUND_TOP - 24
    this.player = new Player(this, spawnX, spawnY, this.selectedCharacter, this.nickname)
    this.players.set('player1', this.player)
  }

  // ─── Camera ───────────────────────────────────────────────────────────────

  _createCamera() {
    this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0)
    this.cameras.main.setDeadzone(200, 0)
  }

  // ─── HUD ──────────────────────────────────────────────────────────────────

  _createHUD() {
    const style = {
      fontSize: '18px',
      fontFamily: 'Arial Black, Arial',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3
    }

    this.hudNickname = this.add.text(16, 12, this.nickname, style)
      .setScrollFactor(0).setDepth(10)

    this.hudScore = this.add.text(16, 36, 'SCORE: 0', style)
      .setScrollFactor(0).setDepth(10)
  }

  _updateHUD() {
    this.hudScore.setText(`SCORE: ${this.score}`)
  }

  // ─── Collisions ───────────────────────────────────────────────────────────

  _setupCollisions() {
    const player = this.player.sprite

    // Player on ground / platforms
    this.physics.add.collider(player, this.groundGroup)
    this.physics.add.collider(player, this.platformGroup)

    // Goombas on ground / platforms
    this.physics.add.collider(this.goombaGroup, this.groundGroup)
    this.physics.add.collider(this.goombaGroup, this.platformGroup)

    // Player vs Question blocks
    this.physics.add.collider(player, this.questionBlockGroup, (p, blockSprite) => {
      if (this.player.prevVelY < -80) {
        blockSprite.getData('entity')?.hit()
      }
    })

    // Player vs Goombas
    this.physics.add.overlap(player, this.goombaGroup, this._handleGoombaCollision, null, this)

    // Player vs Coins
    this.physics.add.overlap(player, this.coinGroup, this._collectCoin, null, this)

    // Player vs Flagpole
    this.physics.add.overlap(player, this.flag, this._levelClear, null, this)
  }

  _handleGoombaCollision(playerSprite, goombaSprite) {
    const goomba = goombaSprite.getData('entity')
    if (!goomba || goomba.isDead) return

    // Player falling down on top of goomba
    if (this.player.prevVelY > 80) {
      goomba.stomp()
      this.player.sprite.setVelocityY(-380)
      this.addScore(200)
    } else {
      this.player.die()
    }
  }

  _collectCoin(playerSprite, coinSprite) {
    coinSprite.destroy()
    this.addScore(100)
  }

  _levelClear() {
    if (this.player.isDead) return
    this.player.isDead = true

    this.time.delayedCall(600, () => {
      this.scene.start('GameOverScene', {
        cleared:   true,
        score:     this.score + 1000,
        nickname:  this.nickname,
        character: this.selectedCharacter
      })
    })
  }

  // ─── Public helpers (called by QuestionBlock) ─────────────────────────────

  spawnBlockCoin(x, y) {
    new Coin(this, x, y, false)
  }

  addScore(points) {
    this.score += points
  }
}

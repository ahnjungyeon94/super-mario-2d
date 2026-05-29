export default class Player {
  constructor(scene, x, y, character = 'mario', nickname = '플레이어', id = 'player1') {
    this.scene     = scene
    this.character = character
    this.nickname  = nickname
    this.id        = id
    this.isDead    = false
    this.prevVelY  = 0

    this._walkFrame = 1
    this._walkTimer = 0
    this._lastState = 'idle'

    this.sprite = scene.physics.add.sprite(x, y, `${character}_idle`)
    this.sprite.setCollideWorldBounds(true)
    this.sprite.body.setSize(24, 44)
    this.sprite.body.setOffset(4, 4)
    this.sprite.setData('entity', this)
  }

  update(cursors, spaceKey, touch = null) {
    if (this.isDead) return

    this.prevVelY = this.sprite.body.velocity.y
    const onGround = this.sprite.body.blocked.down
    const speed = 220

    const leftDown  = cursors.left.isDown  || (touch?.left  ?? false)
    const rightDown = cursors.right.isDown || (touch?.right ?? false)

    if (leftDown) {
      this.sprite.setVelocityX(-speed)
      this.sprite.setFlipX(true)
    } else if (rightDown) {
      this.sprite.setVelocityX(speed)
      this.sprite.setFlipX(false)
    } else {
      this.sprite.setVelocityX(0)
    }

    const jumpPressed =
      Phaser.Input.Keyboard.JustDown(spaceKey) ||
      Phaser.Input.Keyboard.JustDown(cursors.up) ||
      (touch?.jumpJustDown ?? false)

    if (jumpPressed && onGround) {
      this.sprite.setVelocityY(-580)
    }

    this._updateTexture(onGround)
  }

  _updateTexture(onGround) {
    const vx = this.sprite.body.velocity.x

    if (!onGround) {
      if (this._lastState !== 'jump') {
        this.sprite.setTexture(`${this.character}_jump`)
        this._lastState = 'jump'
      }
      return
    }

    if (Math.abs(vx) > 20) {
      this._walkTimer++
      if (this._walkTimer > 7) {
        this._walkTimer = 0
        this._walkFrame = this._walkFrame === 1 ? 2 : 1
        this.sprite.setTexture(`${this.character}_walk${this._walkFrame}`)
        this._lastState = `walk${this._walkFrame}`
      }
    } else {
      if (this._lastState !== 'idle') {
        this.sprite.setTexture(`${this.character}_idle`)
        this._lastState = 'idle'
      }
    }
  }

  die() {
    if (this.isDead) return
    this.isDead = true
    this.sprite.setTexture(`${this.character}_jump`)
    this.sprite.setVelocityY(-400)
    this.sprite.setVelocityX(0)
    this.sprite.body.enable = false

    this.scene.time.delayedCall(1400, () => {
      this.scene.scene.start('GameOverScene', {
        cleared:   false,
        score:     this.scene.score,
        nickname:  this.nickname,
        character: this.character
      })
    })
  }
}

export default class Goomba {
  constructor(scene, x, y) {
    this.scene     = scene
    this.speed     = 80
    this.direction = -1
    this.isDead    = false
    this._walkFrame = 1
    this._walkTimer = 0

    this.sprite = scene.physics.add.sprite(x, y, 'goomba1')
    this.sprite.setCollideWorldBounds(true)
    this.sprite.body.setSize(24, 24)
    this.sprite.body.setOffset(2, 4)
    this.sprite.setData('entity', this)
  }

  update() {
    if (this.isDead) return

    this.sprite.setVelocityX(this.speed * this.direction)

    if (this.sprite.body.blocked.left)  this.direction = 1
    if (this.sprite.body.blocked.right) this.direction = -1

    this.sprite.setFlipX(this.direction === 1)

    this._walkTimer++
    if (this._walkTimer > 12) {
      this._walkTimer = 0
      this._walkFrame = this._walkFrame === 1 ? 2 : 1
      this.sprite.setTexture(`goomba${this._walkFrame}`)
    }
  }

  stomp() {
    if (this.isDead) return
    this.isDead = true
    this.sprite.setVelocityX(0)
    this.sprite.setVelocityY(0)
    this.sprite.body.enable = false
    this.sprite.setScale(1, 0.35)

    this.scene.time.delayedCall(350, () => {
      if (this.sprite?.active) this.sprite.destroy()
    })
  }
}

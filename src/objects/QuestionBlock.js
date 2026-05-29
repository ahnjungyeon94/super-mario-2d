export default class QuestionBlock {
  constructor(scene, x, y) {
    this.scene     = scene
    this.isHit     = false
    this.originY   = y

    // Dynamic sprite kept immovable so it can be tweened
    this.sprite = scene.physics.add.sprite(x, y, 'qblock')
    this.sprite.body.allowGravity = false
    this.sprite.setImmovable(true)
    this.sprite.setData('entity', this)
  }

  hit() {
    if (this.isHit) return
    this.isHit = true

    // Bump up then back
    this.scene.tweens.add({
      targets: this.sprite,
      y: this.originY - 12,
      duration: 80,
      yoyo: true,
      ease: 'Quad.easeOut',
      onComplete: () => {
        this.sprite.setTexture('used_block')
        this.sprite.body.reset(this.sprite.x, this.originY)
        // Spawn coin above block
        this.scene.spawnBlockCoin(this.sprite.x, this.originY - 32)
        this.scene.addScore(100)
      }
    })
  }
}

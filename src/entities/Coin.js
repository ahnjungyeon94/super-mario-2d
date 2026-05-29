export default class Coin {
  // isStatic=true: level coin (static body)
  // isStatic=false: block-spawned coin (dynamic, floats up and vanishes)
  constructor(scene, x, y, isStatic = true) {
    this.scene = scene

    if (isStatic) {
      this.sprite = scene.physics.add.staticSprite(x, y, 'coin')
    } else {
      this.sprite = scene.physics.add.sprite(x, y, 'coin')
      this.sprite.body.allowGravity = false
      scene.tweens.add({
        targets: this.sprite,
        y: y - 48,
        alpha: 0,
        duration: 500,
        ease: 'Quad.easeOut',
        onComplete: () => { if (this.sprite?.active) this.sprite.destroy() }
      })
    }

    this.sprite.setData('entity', this)

    // Spin tween (visual only)
    scene.tweens.add({
      targets: this.sprite,
      scaleX: 0.15,
      duration: 250,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    })
  }
}

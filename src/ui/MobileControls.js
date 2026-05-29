export default class MobileControls {
  constructor(scene) {
    this.scene  = scene
    this.left   = false
    this.right  = false
    this._jump  = false
    this._prevJump = false

    this._build()
  }

  _build() {
    // 왼쪽 방향키: x=65, y=540
    this._leftBtn  = this._makeBtn(65,  540, 48, '◀', 0x2255ee)
    // 오른쪽 방향키: x=165, y=540
    this._rightBtn = this._makeBtn(165, 540, 48, '▶', 0x2255ee)
    // 점프 버튼: x=735, y=540
    this._jumpBtn  = this._makeBtn(735, 540, 54, '▲', 0xdd2222)

    this._bind(this._leftBtn,  v => { this.left  = v })
    this._bind(this._rightBtn, v => { this.right = v })
    this._bind(this._jumpBtn,  v => { this._jump = v })
  }

  _makeBtn(x, y, r, icon, color) {
    const g = this.scene.add.graphics()
    g.fillStyle(color, 0.55)
    g.lineStyle(2, 0xffffff, 0.6)
    g.fillCircle(0, 0, r)
    g.strokeCircle(0, 0, r)
    g.setPosition(x, y).setScrollFactor(0).setDepth(50)
    g.setInteractive(
      new Phaser.Geom.Circle(0, 0, r),
      Phaser.Geom.Circle.Contains
    )

    this.scene.add.text(x, y, icon, {
      fontSize: icon.length > 1 ? '15px' : '24px',
      fontFamily: 'Arial Black, Arial',
      color: '#ffffff'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(51)

    return g
  }

  _bind(btn, setState) {
    btn.on('pointerdown',   () => setState(true))
    btn.on('pointerup',     () => setState(false))
    btn.on('pointerout',    () => setState(false))
    btn.on('pointercancel', () => setState(false))
  }

  get jumpJustDown() {
    return this._jump && !this._prevJump
  }

  update() {
    this._prevJump = this._jump
  }
}

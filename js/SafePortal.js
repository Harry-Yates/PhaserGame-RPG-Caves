export default class SafePortal extends Phaser.Physics.Matter.Sprite {
  //exports the safeportal class
  static preload(scene) {
    scene.load.atlas("safeportal", "./assets/images/safeportal/safeportal.png", "./assets/images/safeportal/safeportal_atlas.json");
  }

  constructor(data) {
    let { scene, safeportal } = data;
    super(scene.matter.world, safeportal.x, safeportal.y, "safeportal", safeportal.type);
    this.scene.add.existing(this);
    let yOrigin = safeportal.properties.find((p) => p.name == "yOrigin").value;
    this.x += this.width / 2;
    this.y -= this.height / 2;
    this.y = this.y + this.height * (yOrigin - 0.5);
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    var circleCollider = Bodies.circle(this.x, this.y, 3, { isSensor: false, label: "safeportal" });
    this.setExistingBody(circleCollider);
    this.setStatic(true);
    this.setOrigin(0.5, yOrigin);
  }
}

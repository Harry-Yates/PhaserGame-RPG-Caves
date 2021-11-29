export default class EndPortal extends Phaser.Physics.Matter.Sprite {
  //exports the endportal class
  static preload(scene) {
    scene.load.atlas("endportal", "./assets/images/endportal/endportal.png", "./assets/images/endportal/endportal_atlas.json");
  }

  constructor(data) {
    let { scene, endportal } = data;
    super(scene.matter.world, endportal.x, endportal.y, "endportal", endportal.type);
    this.scene.add.existing(this);
    let yOrigin = endportal.properties.find((p) => p.name == "yOrigin").value;
    this.x += this.width / 2;
    this.y -= this.height / 2;
    this.y = this.y + this.height * (yOrigin - 0.5);
    const { Bodies } = Phaser.Physics.Matter.Matter;
    var circleCollider = Bodies.circle(this.x, this.y, 10, { isSensor: false, label: "endportal" });
    this.setExistingBody(circleCollider);
    this.setStatic(true);
    this.setOrigin(0.65, yOrigin);
  }
}

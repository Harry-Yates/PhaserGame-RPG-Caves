export default class Portal extends Phaser.Physics.Matter.Sprite {
  //exports the portal class
  static preload(scene) {
    scene.load.atlas("portal", "./assets/images/portal/portal.png", "./assets/images/portal/portal_atlas.json");
  }

  constructor(data) {
    let { scene, portal } = data;
    super(scene.matter.world, portal.x, portal.y, "portal", portal.type);
    this.scene.add.existing(this);
    let yOrigin = portal.properties.find((p) => p.name == "yOrigin").value;
    this.x += this.width / 2;
    this.y -= this.height / 2;
    this.y = this.y + this.height * (yOrigin - 0.5);
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    var circleCollider = Bodies.circle(this.x, this.y, 7, { isSensor: false, label: "collider" });
    this.setExistingBody(circleCollider);
    this.setStatic(true);
    this.setOrigin(0.5, yOrigin);
  }
}

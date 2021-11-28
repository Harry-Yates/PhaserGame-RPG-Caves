export default class Angel extends Phaser.Physics.Matter.Sprite {
  //exports the angel class
  static preload(scene) {
    scene.load.atlas("angel", "./assets/images/angel/angel.png", "./assets/images/angel/angel_atlas.json");
    scene.load.audio("angelSound", "./assets/audio/angel.wav");
  }

  constructor(data) {
    let { scene, angel } = data;
    // console.log(angel);
    super(scene.matter.world, angel.x, angel.y, "angel", angel.type);
    this.scene.add.existing(this);
    let yOrigin = angel.properties.find((p) => p.name == "yOrigin").value;
    this.x += this.width / 2;
    this.y -= this.height / 2;
    this.y = this.y + this.height * (yOrigin - 0.5);
    const { Bodies } = Phaser.Physics.Matter.Matter;
    var circleCollider = Bodies.circle(this.x, this.y, 9, { isSensor: false, label: "angel.this" });
    this.setExistingBody(circleCollider);
    this.setStatic(true);
    this.setOrigin(0.5, 0.9, yOrigin);
  }
}

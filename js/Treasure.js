export default class Treasure extends Phaser.Physics.Matter.Sprite {
  static preload(scene) {
    scene.load.atlas("treasure", "./assets/images/treasure/treasure.png", "./assets/images/treasure/treasure_atlas.json");
    scene.load.audio("chest", "./assets/audio/chest.wav");
    scene.load.audio("orb", "./assets/audio/orb.wav");
    scene.load.audio("sack", "./assets/audio/sack.mp3");
    scene.load.audio("coins", "./assets/audio/coins.wav");
  }

  constructor(data) {
    let { scene, treasure } = data;
    super(scene.matter.world, treasure.x, treasure.y, "treasure", treasure.type);
    this.scene.add.existing(this);
    let yOrigin = treasure.properties.find((p) => p.name == "yOrigin").value;
    this.name = treasure.type;
    this.health = 1;
    this.sound = this.scene.sound.add(this.name);
    this.x += this.width / 2;
    this.y -= this.height / 2;
    this.y = this.y + this.height * (yOrigin - 0.5);
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    var circleCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: "collider" });
    this.setExistingBody(circleCollider);
    this.setStatic(true);
    this.setOrigin(0.5, 0.3);
  }

  get dead() {
    return this.health <= 0;
  }

  hit = () => {
    if (this.sound) this.sound.play();
    this.health--;
    console.log(`Collected:${this.name} Health:${this.health}`);
  };
}

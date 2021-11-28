import MatterEntity from "./MatterEntity.js";

export default class Treasure extends MatterEntity {
  static preload(scene) {
    scene.load.atlas("treasure", "./assets/images/treasure/treasure.png", "./assets/images/treasure/treasure_atlas.json");
    scene.load.audio("chest", "./assets/audio/chest.wav");
    scene.load.audio("orb", "./assets/audio/orb.wav");
    scene.load.audio("sack", "./assets/audio/sack.mp3");
    scene.load.audio("coins", "./assets/audio/coins.wav");
  }

  constructor(data) {
    let { scene, treasure } = data;
    // console.log(treasure);
    let drops = JSON.parse(treasure.properties.find((p) => p.name == "drops").value);
    let depth = treasure.properties.find((p) => p.name == "depth").value;
    super({ scene, x: treasure.x, y: treasure.y, texture: "treasure", frame: treasure.type, drops, depth, health: 1, name: treasure.type });
    let yOrigin = treasure.properties.find((p) => p.name == "yOrigin").value;
    this.y = this.y + this.height * (yOrigin - 0.5);
    const { Bodies } = Phaser.Physics.Matter.Matter;
    var circleCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: "collider" });
    this.setExistingBody(circleCollider);
    this.setStatic(true);
    this.setOrigin(0.5, 0.3);
  }
}

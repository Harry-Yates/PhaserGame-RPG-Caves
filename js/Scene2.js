import Player from "./Player.js";
import Treasure from "./Treasure.js";
import Enemy from "./Enemy.js";
import Portal from "./Portal.js";

class Scene2 extends Phaser.Scene {
  constructor() {
    super("scene2");
    this.enemies = [];
  }
  preload() {
    // what assets does the game need
    console.log("helloxs");
    Player.preload(this);
    Enemy.preload(this);
    Treasure.preload(this);
    Portal.preload(this);
    this.load.image("dirt", "../assets/images/DeathTrapScene/dirt.png");
    this.load.image("elements", "./assets/images/DeathTrapScene/elements.png");
    this.load.image("resources", "./assets/images/DeathTrapScene/resources.png");
    this.load.tilemapTiledJSON("map2", "./assets/images/DeathTrapScene/opening-scene-map2.json");
  }

  create() {
    // this.scale.displaySize.setAspectRatio(width / height);
    // this.scale.refresh();
    // setTimeout(() => {
    //   this.scene.start("scene2");
    // }, 2000);

    console.log("hello death trap", this.matter);
    const map = this.make.tilemap({ key: "map2" });
    this.map = map;
    const resources = map.addTilesetImage("resources", "resources", 32, 32, 0, 0);
    const dirt = map.addTilesetImage("dirt", "dirt", 32, 32, 0, 0);
    const elements = map.addTilesetImage("elements", "elements", 32, 32, 0, 0);
    const layer1 = map.createLayer("Tile Layer 1", resources, 0, 0);
    const layer2 = map.createLayer("Tile Layer 2", resources, 0, 0);
    const layer3 = map.createLayer("Tile Layer 3", resources, 0, 0);

    layer1.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);
    layer2.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer2);
    layer3.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer3);
    this.map.getObjectLayer("Treasure").objects.forEach((treasure) => new Treasure({ scene: this, treasure }));
    this.map.getObjectLayer("Enemies").objects.forEach((enemy) => this.enemies.push(new Enemy({ scene: this, enemy })));
    this.player = new Player({ scene: this, x: 188, y: 310, texture: "main_character", frame: "u1" });
    // this.player.setScale(1.5);
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      console.log("test");
      if (bodyA.label == "portal" && bodyB.label == "playerSensor") {
        this.scene.start("DeathTrapScene");
        console.log("change screen");
      }
      console.log(bodyA.label);
      console.log(bodyB.label);
      console.log(this.scene);
    });
  }

  update() {
    this.enemies.forEach((enemy) => enemy.update());
    this.player.update();
  }
}

export default Scene2;

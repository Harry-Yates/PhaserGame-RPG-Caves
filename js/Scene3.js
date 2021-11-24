import Player from "./Player.js";
import Treasure from "./Treasure.js";
import Enemy from "./Enemy.js";
import Portal from "./Portal.js";
import SafePortal from "./SafePortal.js";

class Scene3 extends Phaser.Scene {
  constructor() {
    super("scene3");
    this.enemies = [];
  }
  preload() {
    // what assets does the game need
    console.log("hello Scene 3");
    Player.preload(this);
    Enemy.preload(this);
    Treasure.preload(this);
    Portal.preload(this);
    SafePortal.preload(this);
    this.load.image("dirt", "../assets/images/bridgeScene/dirt.png");
    this.load.image("elements", "./assets/images/bridgeScene/elements.png");
    this.load.image("resources", "./assets/images/bridgeScene/resources.png");
    this.load.tilemapTiledJSON("map3", "./assets/images/bridgeScene/opening-scene-map3.json");
  }

  create() {
    // this.scale.displaySize.setAspectRatio(width / height);
    // this.scale.refresh();
    // setTimeout(() => {
    //   this.scene.start("scene2");
    // }, 2000);

    console.log("hello bridge scene", this.matter);
    const map = this.make.tilemap({ key: "map3" });
    this.map = map;
    const resources = map.addTilesetImage("resources", "resources", 32, 32, 0, 0);
    const dirt = map.addTilesetImage("dirt", "dirt", 32, 32, 0, 0);
    const elements = map.addTilesetImage("elements", "elements", 32, 32, 0, 0);
    const layer1 = map.createLayer("Tile Layer 1", dirt, 0, 0);
    const layer2 = map.createLayer("Tile Layer 2", resources, 0, 0);
    const layer3 = map.createLayer("Tile Layer 3", resources, 0, 0);

    layer1.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);
    layer2.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer2);
    layer3.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer3);
    this.map.getObjectLayer("Treasure").objects.forEach((treasure) => new Treasure({ scene: this, treasure }));
    this.map.getObjectLayer("Portal").objects.forEach((portal) => new Portal({ scene: this, portal }));
    this.map.getObjectLayer("SafePortal").objects.forEach((safeportal) => new SafePortal({ scene: this, safeportal }));
    this.map.getObjectLayer("Enemies").objects.forEach((enemy) => this.enemies.push(new Enemy({ scene: this, enemy })));
    this.player = new Player({ scene: this, x: 105, y: 490, texture: "main_character", frame: "u1" });
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
        this.scene.start("scene2");
        console.log("change screen");
      } else if (bodyA.label == "safeportal" && bodyB.label == "playerSensor") {
        setTimeout(() => {
          this.scene.start("scene2");
        }, 1);
        console.log("change screen");
      }
      console.log(bodyA.label);
      console.log(bodyB.label);
      console.log(this.scene);
    });
    // let camera = this.cameras.main;
    // camera.zoom = 1.6;
    // camera.startFollow(this.player);
    // camera.setLerp(0.1, 0.1);
    // camera.setBounds(0, 0, this.game.config.width, this.game.config.height);
  }

  update() {
    this.enemies.forEach((enemy) => enemy.update());
    this.player.update();
  }
}

export default Scene3;

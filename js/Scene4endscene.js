import Player from "./Player.js";
import Treasure from "./Treasure.js";
import Enemy from "./Enemy.js";
import Portal from "./Portal.js";
import SafePortal from "./SafePortal.js";
import Angel from "./Angel.js";

let textbubble, content;
class Scene4endscene extends Phaser.Scene {
  constructor() {
    super("scene4endscene");
    this.enemies = [];
  }
  preload() {
    // what assets does the game need
    Player.preload(this);
    Enemy.preload(this);
    Treasure.preload(this);
    Portal.preload(this);
    SafePortal.preload(this);
    Angel.preload(this);
    this.load.image("dirt", "../assets/images/endScene/dirt.png");
    this.load.image("elements", "./assets/images/endScene/elements.png");
    this.load.image("resources", "./assets/images/endScene/resources.png");
    this.load.tilemapTiledJSON("end-scene", "./assets/images/endScene/end-scene.json");
  }

  create() {
    // this.scale.displaySize.setAspectRatio(width / height);
    // this.scale.refresh();
    // setTimeout(() => {
    //   this.scene.start("scene2");
    // }, 2000);

    console.log("hello bridge scene", this.matter);
    const map = this.make.tilemap({ key: "end-scene" });
    this.map = map;
    const resources = map.addTilesetImage("resources", "resources", 32, 32, 0, 0);
    const dirt = map.addTilesetImage("dirt", "dirt", 32, 32, 0, 0);
    const elements = map.addTilesetImage("elements", "elements", 32, 32, 0, 0);
    const layer0 = map.createLayer("Tile Layer 0", dirt, 0, 0);
    const layer1 = map.createLayer("Tile Layer 1", resources, 0, 0);
    const layer2 = map.createLayer("Tile Layer 2", resources, 0, 0);
    const layer3 = map.createLayer("Tile Layer 3", resources, 0, 0);
    let angelSound = this.sound.add("angelSound");

    layer0.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer0);
    layer1.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);
    layer2.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer2);
    layer3.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer3);
    this.map.getObjectLayer("Treasure").objects.forEach((treasure) => new Treasure({ scene: this, treasure }));
    this.map.getObjectLayer("Portal").objects.forEach((portal) => new Portal({ scene: this, portal }));
    this.map.getObjectLayer("SafePortal").objects.forEach((safeportal) => new SafePortal({ scene: this, safeportal }));
    this.map.getObjectLayer("Angel").objects.forEach((angel) => new Angel({ scene: this, angel }));
    this.map.getObjectLayer("Enemies").objects.forEach((enemy) => this.enemies.push(new Enemy({ scene: this, enemy })));
    this.player = new Player({ scene: this, x: 300, y: 500, texture: "main_character", frame: "u1" });
    // this.player.setScale(1.5);
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      if (bodyA.label == "portal" && bodyB.label == "playerSensor") {
        this.scene.start("scene2");
      } else if (bodyA.label == "safeportal" && bodyB.label == "playerSensor") {
        setTimeout(() => {
          this.scene.start("scene2");
        }, 1);
      } else if (bodyA.label == "angel" && bodyB.label == "playerSensor") {
        console.log("An Angel!");

        content = ["    Go forth!"];
        angelSound.play();
        textbubble = this.add.image(110, 220, "textBubble").setOrigin(0);
        textbubble.setScale(0.11);
        this.add.text(110, 220, content, { fontFamily: "Arial", fontSize: 15, padding: 10, color: "#333", wordWrap: { width: 100 } }).setOrigin(0);
      }

      // console.log(bodyA.label);
      // console.log(bodyB.label);
      // console.log(this.scene);
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

export default Scene4endscene;

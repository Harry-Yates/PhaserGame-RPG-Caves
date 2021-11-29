import Player from "./Player.js";
import Treasure from "./Treasure.js";
import Enemy from "./Enemy.js";
import Portal from "./Portal.js";
import SafePortal from "./SafePortal.js";
import Angel from "./Angel.js";

export default class SceneOne extends Phaser.Scene {
  constructor() {
    super("SceneOne");
    // this.enemies = [];
    this.textbubble, this.content, this.updateScore, this.score = 0;
   
  }

  preload() {
    Player.preload(this);
    // Enemy.preload(this);
    Treasure.preload(this);
    Portal.preload(this);
    SafePortal.preload(this);
    Angel.preload(this);
    this.load.image("dirt", "./assets/images/map-environment/dirt.png");
    this.load.image("elements", "./assets/images/map-environment/elements.png");
    this.load.image("resources", "./assets/images/map-environment/resources.png");
    this.load.tilemapTiledJSON("map", "./assets/images/map-environment/opening-scene-map.json");
    // text box
    this.load.image("textBubble", "./assets/images/textbubble.png");
  }

  create() {
    // this.scale.displaySize.setAspectRatio(width / height);
    // this.scale.refresh();
    // setTimeout(() => {
    //   this.scene.start("scene2");
    // }, 1);

    // console.log("hello death trap", this.matter);
    const map = this.make.tilemap({ key: "map" });
    this.map = map;
    const groundDirt = map.addTilesetImage("dirt", "dirt", 32, 32, 0, 0);
    const groundObjects = map.addTilesetImage("elements", "elements", 32, 32, 0, 0);
    const resources = map.addTilesetImage("resources", "resources", 32, 32, 0, 0);
    const layer1 = map.createLayer("Tile Layer 1", groundDirt, 0, 0);
    const layer2 = map.createLayer("Tile Layer 2", groundObjects, 0, 0);
    const layer3 = map.createLayer("Tile Layer 3", resources, 0, 0);
    let angelSound = this.sound.add("angelSound");
  
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
    // this.map.getObjectLayer("Enemies").objects.forEach((enemy) => this.enemies.push(new Enemy({ scene: this, enemy })));
    this.player = new Player({ scene: this, x: 180, y: 480, texture: "main_character", frame: "u1" });
    // this.player.setScale(1.5);
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      if (bodyA.label == "portal" && bodyB.label == "playerSensor") {
        setTimeout(() => {
          this.scene.start("scene2", { score: this.score });
        }, 1);
        // console.log("change screen");
      } else if (bodyA.label == "safeportal" && bodyB.label == "playerSensor") {
        setTimeout(() => {
          this.scene.start("scene3", { score: this.score });
          console.log("score saved at scene one before changing scenes", this.score);
        }, 1);
        // console.log("change screen");
      } else if (bodyA.label == "angel" && bodyB.label == "playerSensor") {
        angelSound.play();
        this.textbubble = this.add.image(280, 320, "textBubble").setOrigin(0);
        this.textbubble.setScale(0.09);
        this.content = this.add.text(280, 318, "Left cave", { fontFamily: "Arial", fontSize: 15, padding: 10, color: "#333", wordWrap: { width: 70 } }).setOrigin(0);
      }
    });

    // let camera = this.cameras.main;
    // camera.zoom = 1.6;
    // camera.startFollow(this.player);
    // camera.setLerp(0.1, 0.1);
    // camera.setBounds(0, 0, this.game.config.width, this.game.config.height);
    this.matter.world.on("collisionend", (event, bodyA, bodyB) => {
      if (bodyA.label == "angel" && bodyB.label == "playerSensor") {
        this.textbubble.destroy();
        this.content.destroy();
      }
    });
    // this.updateScore(score);

    this.scoreText = this.add.text(10, 5, `score: ${this.score}`, { fontSize: "20px", fill: "#fff" });

    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      if (bodyA.label == "collider" && bodyB.label == "playerSensor") {
        this.score += 10;
        this.scoreText.setText(`score: ${this.score}`);
        console.log("score in scene 1:", this.score);
      }
    });


  }

  // updateScore(score){
  //   this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
  //     if (bodyA.label == "collider" && bodyB.label == "playerSensor") {
  //       score += 10;
  //       this.scoreText.setText("score: " + score);
  //     }
  //   });
    

  //   this.scoreText = this.add.text(10, 5, "score: 0", { fontSize: "20px", fill: "#fff" });
  // }

  update() {
    // this.enemies.forEach((enemy) => enemy.update());
    this.player.update();
  }
}

import Player from "./Player.js";
import Treasure from "./Treasure.js";
import Enemy from "./Enemy.js";
import Portal from "./Portal.js";
import SafePortal from "./SafePortal.js";
import Angel from "./Angel.js";

var coinEventListener;
class Scene3 extends Phaser.Scene {
  constructor() {
    super("scene3");
    this.enemies = [];
    this.textbubble, this.content, this.score;
  }
  init(data) {
    // console.log('init', data);
    this.score = data.score;
    // console.log("score from scene 1 is:", this.score);
    // console.log("treasure data", data.treasureCoinCatcher);
  }
  preload() {
    // what assets does the game need
    Player.preload(this);
    Enemy.preload(this);
    Treasure.preload(this);
    Portal.preload(this);
    SafePortal.preload(this);
    Angel.preload(this);
    this.load.image("dirt", "./assets/images/bridgeScene/dirt.png");
    this.load.image("elements", "./assets/images/bridgeScene/elements.png");
    this.load.image("resources", "./assets/images/bridgeScene/resources.png");
    this.load.tilemapTiledJSON("map3", "./assets/images/bridgeScene/opening-scene-map3.json");
    this.load.image("textBubble", "./assets/images/textbubble.png");
    this.load.image("particle", "./assets/images/blueparticle.png");
    this.load.audio("easterEggsax", "./assets/audio/epicsax.mp3");
  }

  create() {
    // this.scale.displaySize.setAspectRatio(width / height);
    // this.scale.refresh();
    // setTimeout(() => {
    //   this.scene.start("scene2");
    // }, 2000);

    // console.log("hello bridge scene", this.matter);
    const map = this.make.tilemap({ key: "map3" });
    this.map = map;
    const resources = map.addTilesetImage("resources", "resources", 32, 32, 0, 0);
    const dirt = map.addTilesetImage("dirt", "dirt", 32, 32, 0, 0);
    const elements = map.addTilesetImage("elements", "elements", 32, 32, 0, 0);
    const layer1 = map.createLayer("Tile Layer 1", dirt, 0, 0);
    const layer2 = map.createLayer("Tile Layer 2", resources, 0, 0);
    const layer3 = map.createLayer("Tile Layer 3", resources, 0, 0);
    const particles = this.add.particles("particle");
    let angelSound = this.sound.add("angelSound");
    this.load.audio("easterEggsax", "./assets/audio/epicsax.mp3");
    //add score
    this.scoreText = this.add.text(10, 5, `score: ${this.score}`, { fontSize: "20px", fill: "#fff" });
    // console.log("score at scene 3 is: ", this.score);

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
    this.player = new Player({ scene: this, x: 105, y: 490, texture: "main_character", frame: "u1" });
    // this.player.setScale(1.5);
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      if (bodyA.label == "portal" && bodyB.label == "playerSensor") {
        this.scene.start("scene2", { score: this.score });
      } else if (bodyA.label == "safeportal" && bodyB.label == "playerSensor") {
        setTimeout(() => {
          this.scene.start("scene5", { score: this.score });
        }, 1);
        console.log("change screen");
      } else if (bodyA.label == "angel" && bodyB.label == "playerSensor") {
        setTimeout(() => {
          console.log("An Angel was eeer");
        }, 1);
        // console.log("An Angel!");
        angelSound.play();
        this.textbubble = this.add.image(260, 10, "textBubble").setOrigin(0);
        this.textbubble.setScale(0.095);
        this.content = this.add.text(260, 10, "Third cave", { fontFamily: "Arial", fontSize: 15, padding: 10, color: "#333", wordWrap: { width: 100 } }).setOrigin(0);
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
    this.matter.world.on("collisionend", (event, bodyA, bodyB) => {
      if (bodyA.label == "angel" && bodyB.label == "playerSensor") {
        // console.log("Bye Angel!");
        this.textbubble.destroy();
        this.content.destroy();
      }

      // update score on collision
      // console.log("create collision scene 3");
      if (!coinEventListener) {
        this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
          if (bodyA.label == "coins" && bodyB.label == "playerSensor") {
            // console.log("name before scene 3", bodyA.label, bodyB.label);
            this.score += 10;
            this.scoreText.setText(`score: ${this.score}`);
            console.log(`score: ${this.score}`);
            // console.log("Updated score at scene 3 is: ", this.score);
          }
        });
        coinEventListener = true;
      }
    });
    const emitter = particles.createEmitter({
      x: 335,
      y: 80,
      speed: 200,
      scale: 0.06,
      speed: 6,
      lifespan: 7000,
      blendMode: "NORMAL",
      frequency: 800,
      gravityY: -20,
      gravityX: 1,
      alpha: 1,
      // delay: 3400,
      maxVelocityX: 10,
      maxVelocityY: 10,
      active: true,
    });
    //EASTER EGG PLAYER
    let easterEgg = this.sound.add("easterEggsax");
    this.input.keyboard.on("keydown-Q", function () {
      easterEgg.play();
      console.log("You found the Q button Easter egg");
    });
  }

  update() {
    this.enemies.forEach((enemy) => enemy.update());
    this.player.update();
  }
}

export default Scene3;

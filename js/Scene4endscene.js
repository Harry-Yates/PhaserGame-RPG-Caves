import Player from "./Player.js";
import Treasure from "./Treasure.js";
import Enemy from "./Enemy.js";
import Portal from "./Portal.js";
import SafePortal from "./SafePortal.js";
import Angel from "./Angel.js";
import EndPortal from "./EndPortal.js";

var coinEventListener;
class Scene4endscene extends Phaser.Scene {
  constructor() {
    super("scene4endscene");
    this.enemies = [];
    this.textbubble, this.content, this.score;
  }

  init(data) {
    this.score = data.score;
  }
  preload() {
    // what assets does the game need
    Player.preload(this);
    Enemy.preload(this);
    Treasure.preload(this);
    Portal.preload(this);
    SafePortal.preload(this);
    Angel.preload(this);
    this.load.image("dirt", "./assets/images/endScene/dirt.png");
    this.load.image("elements", "./assets/images/endScene/elements.png");
    this.load.image("resources", "./assets/images/endScene/resources.png");
    this.load.image("endportal", "./assets/images/endportal/endportal.png");
    this.load.tilemapTiledJSON("end-scene", "./assets/images/endScene/end-scene.json");
    this.load.image("particle", "./assets/images/blueparticle.png");
    this.load.image("textBubble", "./assets/images/textbubble.png");
    this.load.image("Chopper", "./assets/images/chopper.png");
    this.load.audio("choppa", "./assets/audio/choppa.mp3");
    this.load.audio("landing", "./assets/audio/landing.wav");
    this.load.audio("easterEggdeja", "./assets/audio/deja-vu.mp3");
  }

  create() {
    // this.scale.displaySize.setAspectRatio(width / height);
    // this.scale.refresh();
    // setTimeout(() => {
    //   this.scene.start("scene2");
    // }, 2000);

    // console.log("hello bridge scene", this.matter);
    const map = this.make.tilemap({ key: "end-scene" });
    this.map = map;
    const resources = map.addTilesetImage("resources", "resources", 32, 32, 0, 0);
    const dirt = map.addTilesetImage("dirt", "dirt", 32, 32, 0, 0);
    const elements = map.addTilesetImage("elements", "elements", 32, 32, 0, 0);
    const endScene = map.addTilesetImage("endscene", "endscene", 32, 32, 0, 0);
    const layer0 = map.createLayer("Tile Layer 0", dirt, 0, 0);
    const layer1 = map.createLayer("Tile Layer 1", resources, 0, 0);
    const layer2 = map.createLayer("Tile Layer 2", resources, 0, 0);
    const layer3 = map.createLayer("Tile Layer 3", resources, 0, 0);
    const particles = this.add.particles("particle");
    let angelSound = this.sound.add("angelSound");
    let choppa = this.sound.add("choppa");

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
    this.map.getObjectLayer("EndPortal").objects.forEach((endportal) => new EndPortal({ scene: this, endportal }));
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
        // console.log("An Angel!");
        angelSound.play();
        this.textbubble = this.add.image(115, 220, "textBubble").setOrigin(0);
        this.textbubble.setScale(0.095);
        this.content = this.add.text(106, 218, "   Go forth!", { fontFamily: "Arial", fontSize: 15, padding: 10, color: "#333", wordWrap: { width: 100 } }).setOrigin(0);
      }
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
    });
    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      if (bodyA.label == "endportal" && bodyB.label == "playerSensor") {
        choppa.play();

        setTimeout(() => {
          this.scene.start("GamewinScene", { score: this.score });
        }, 6000);
      }
    });

    this.chopper = this.add.image(300, 100, "Chopper").setOrigin(0);
    this.chopper.setScale(0.8);
    this.chopper.setOrigin(-0.5);

    //add score
    this.scoreText = this.add.text(10, 5, `score: ${this.score}`, { fontSize: "20px", fill: "#fff" });

    if (!coinEventListener) {
      this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
        if (bodyA.label == "coins" && bodyB.label == "playerSensor") {
          this.score += 10;
          this.scoreText.setText(`score: ${this.score}`);
          console.log("score in scene4end:", this.score);
        }
      });
      coinEventListener = true;
    }

    const emitter = particles.createEmitter({
      x: 177,
      y: 265,
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
    let easterEgg = this.sound.add("easterEggdeja");
    this.input.keyboard.on("keydown-Q", function () {
      easterEgg.play();
      console.log("You found the Q button Easter egg");
    });

    var landing = this.sound.add("landing");
    landing.play();
  }

  update() {
    this.enemies.forEach((enemy) => enemy.update());
    this.player.update();
    this.chopper.rotation += 0.002;
    this.chopper.setDepth(100);
  }
}

export default Scene4endscene;

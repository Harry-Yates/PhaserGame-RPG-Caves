class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  preload() {
    this.load.image("background", "./assets/images/menuscene/title_bg.png");

    this.load.audio("title_music", "./assets/audio/title_music.mp3");
    this.inputKeys = this.input.keyboard.addKeys({
      start: Phaser.Input.Keyboard.KeyCodes.E,
    });
    this.load.image("particle", "./assets/images/blueparticle.png");
    this.load.image("particlegreen", "./assets/images/green.png");
    this.load.image("fire", "./assets/images/flame1.png");
    this.load.image("wood", "./assets/images/wood.png");
    this.load.image("risingSmoke", "./assets/images/rising-smoke.png");
  }
  create() {
    var bg = this.add.sprite(0, 0, "background");
    bg.setOrigin(0, 0);
    var wood = this.add.sprite(256.6, 496.97, "wood");
    bg.setOrigin(0, 0);
    wood.setScale(0.5);

    //Angel Particle Effect
    const particles = this.add.particles("particle");
    // const Gparticles = this.add.particles("particlegreen");
    const fires = this.add.particles("fire");
    const smoke = this.add.particles("risingSmoke");

    const smokey = smoke.createEmitter({
      x: 265,
      y: 490,
      scale: 0.7,
      speed: 0.1,
      frequency: 900,
      lifespan: 100000,
      blendMode: "ADD",
      frequency: 5000,
      gravityY: -100000,
      // gravityX: -1,
      accelerationY: 0.00000000000001,
      // accelerationX: 0.00000000000001,
      alpha: 0.7,
      // maxVelocityX: 10,
      maxVelocityY: 10,
      // active: true,
    });

    const smokey2 = smoke.createEmitter({
      x: 270,
      y: 470,
      speed: 200,
      scale: 0.7,
      speed: 0.2,
      frequency: 900,
      lifespan: 100000,
      blendMode: "ADD",
      frequency: 5000,
      gravityY: -100000,
      // gravityX: -1,
      accelerationY: 0.00000000000001,
      // accelerationX: 0.00000000000001,
      alpha: 0.9,
      // maxVelocityX: 10,
      maxVelocityY: 10,
      // active: true,
    });

    // const smokey3 = smoke.createEmitter({
    //   x: 250,
    //   y: 460,
    //   speed: 200,
    //   scale: 0.4,
    //   speed: 0.2,
    //   frequency: 5000,
    //   lifespan: 100000,
    //   blendMode: "ADD",
    //   frequency: 3000,
    //   gravityY: -100000,
    //   // gravityX: -1,
    //   accelerationY: 0.00000000000001,
    //   // accelerationX: 0.00000000000001,
    //   alpha: 0.2,
    //   // maxVelocityX: 10,
    //   maxVelocityY: 10,
    //   // active: true,
    // });

    const fireemitter3 = fires.createEmitter({
      x: 256,
      y: 488,
      speed: 300,
      scale: 0.13,
      speed: 0.5,
      frequency: 100,
      lifespan: 4000,
      blendMode: "ADD",
      frequency: 1000,
      // gravityY: -100000,
      // gravityX: -1,
      // accelerationY: 0.00000000000001,
      // accelerationX: 0.00000000000001,
      // alpha: 0.5,
      // maxVelocityX: 10,
      // maxVelocityY: 10,
      // active: true,
    });

    // const fireemitter = Gparticles.createEmitter({
    //   x: 170,
    //   y: 419,
    //   speed: 200,
    //   scale: 0.04,
    //   speed: 6,
    //   lifespan: 9900,
    //   blendMode: "ADD",
    //   frequency: 800,
    //   gravityY: -8,
    //   gravityX: -3,
    //   accelerationY: 0.00000000000001,
    //   accelerationX: 0.00000000000001,
    //   alpha: 0.5,
    //   delay: 3400,
    //   maxVelocityX: 10,
    //   maxVelocityY: 10,
    //   // active: true,
    // });

    const emitterLeft = particles.createEmitter({
      x: 170,
      y: 419,
      speed: 200,
      scale: 0.04,
      speed: 6,
      lifespan: 9900,
      blendMode: "ADD",
      frequency: 800,
      gravityY: -8,
      gravityX: -3,
      accelerationY: 0.00000000000001,
      accelerationX: 0.00000000000001,
      alpha: 0.5,
      delay: 3400,
      maxVelocityX: 10,
      maxVelocityY: 10,
      // active: true,
    });

    const emitterRight = particles.createEmitter({
      x: 228,
      y: 419,
      speed: 200,
      scale: 0.04,
      speed: 6,
      lifespan: 9900,
      blendMode: "ADD",
      frequency: 800,
      gravityY: -8,
      gravityX: 3,
      accelerationY: 0.00000000000001,
      accelerationX: 0.00000000000001,
      alpha: 0.5,
      delay: 3400,
      maxVelocityX: 10,
      maxVelocityY: 10,
      // active: true,
    });

    // e.setDepth(99)

    // var play = this.add.sprite(193, 350, "play_button");
    // bg.setOrigin(0, 0);
    // play.setScale(0.2);

    // var text = this.add.text(77, 100, "CAVES");
    // text.setOrigin(0, 0);
    // text.setScale(5);

    // text.setOrigin(0, 0);
    // text.setScale(1);

    var music = this.sound.add("title_music");
    music.play();

    // Add touch input to start the game
    this.input.on("pointerdown", () => {
      this.sound.get("title_music").stop();
      this.scene.stop("MenuScene");
      this.scene.start("SceneOne");
    });

    // Existing keyboard input to start the game
    this.input.keyboard.on("keydown-E", () => {
      this.sound.get("title_music").stop();
      this.scene.stop("MenuScene");
      this.scene.start("SceneOne");
    });
  }

  update() {
    if (this.inputKeys.start.isDown) {
      this.sound.get("title_music").stop();
      this.scene.stop("MenuScene");
      this.scene.start("SceneOne");
    }
  }

  shutdown() {
    this.sound.get("title_music").stop();
  }
}
export default MenuScene;

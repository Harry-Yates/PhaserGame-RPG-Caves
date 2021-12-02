class GamewinScene extends Phaser.Scene {
  constructor() {
    super("GamewinScene");
    this.scoreText, this.score;
  }

  init(data) {
    this.score = data.score;
  }

  preload() {
    this.load.image("background3", "./assets/images/gamewinscene/gamewin.png");
    this.load.audio("gamewin", "./assets/audio/gamewin.mp3");
    this.load.image("particle", "./assets/images/blueparticle.png");
    this.inputKeys = this.input.keyboard.addKeys({
      start: Phaser.Input.Keyboard.KeyCodes.E,
    });
  }
  create() {
    var bg = this.add.sprite(0, 0, "background3");
    bg.setOrigin(0, 0);
    this.scoreText = this.add.text(166, 364, `${this.score}`, { fontSize: "32px", fill: "#fff" });
    const particles = this.add.particles("particle");

    var music = this.sound.add("gamewin");
    music.play();

    const emitterright = particles.createEmitter({
      x: 335,
      y: 520,
      speed: 200,
      scale: 0.2,
      speed: 6,
      lifespan: 170000,
      blendMode: "NORMAL",
      frequency: 2900,
      gravityY: -20,
      gravityX: 1,
      alpha: 1,
      // delay: 3400,
      maxVelocityX: 10,
      maxVelocityY: 4,
      active: true,
    });

    const emitterleft = particles.createEmitter({
      x: 100,
      y: 520,
      speed: 200,
      scale: 0.2,
      speed: 6,
      lifespan: 170000,
      blendMode: "NORMAL",
      frequency: 2000,
      gravityY: -20,
      gravityX: -0.8,
      alpha: 1,
      // delay: 3400,
      maxVelocityX: 20,
      maxVelocityY: 5,
      active: true,
    });

    const emittercenterright = particles.createEmitter({
      x: 250,
      y: 520,
      speed: 200,
      scale: 0.2,
      speed: 6,
      lifespan: 170000,
      blendMode: "NORMAL",
      frequency: 2500,
      gravityY: -20,
      gravityX: -1,
      alpha: 1,
      // delay: 3400,
      maxVelocityX: 10,
      maxVelocityY: 7,
      active: true,
    });

    const emittercenterleft = particles.createEmitter({
      x: 190,
      y: 520,
      speed: 200,
      scale: 0.2,
      speed: 6,
      lifespan: 170000,
      blendMode: "NORMAL",
      frequency: 2500,
      gravityY: -20,
      gravityX: 1,
      alpha: 1,
      // delay: 3400,
      maxVelocityX: 11,
      maxVelocityY: 8,
      active: true,
    });
  }

  update() {
    if (this.inputKeys.start.isDown) {
      this.scene.start("MenuScene");
      this.sound.get("gamewin").stop();
      console.log(this.scene);
    }
  }
}
export default GamewinScene;

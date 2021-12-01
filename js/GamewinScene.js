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
    this.inputKeys = this.input.keyboard.addKeys({
      start: Phaser.Input.Keyboard.KeyCodes.E,
    });
  }
  create() {
    var bg = this.add.sprite(0, 0, "background3");
    bg.setOrigin(0, 0);
    this.scoreText = this.add.text(159, 362, `${this.score}`, { fontSize: "32px", fill: "#fff" });

    // var play = this.add.sprite(193, 350, "play_button");
    // bg.setOrigin(0, 0);
    // play.setScale(0.2);

    // var text = this.add.text(77, 100, "CAVES");
    // text.setOrigin(0, 0);
    // text.setScale(5);

    // text.setOrigin(0, 0);
    // text.setScale(1);

    var music = this.sound.add("gamewin");
    music.play();
  }

  update() {
    if (this.inputKeys.start.isDown) {
      // console.log("buttonE is pressed");
      // this.registry.destroy(); // destroy registry
      // this.events.off();
      this.scene.start("MenuScene");
      this.sound.get("gamewin").stop();
      console.log(this.scene);
    }
  }
}
export default GamewinScene;

class GameoverScene extends Phaser.Scene {
  constructor() {
    super("GameoverScene");
  }

  preload() {
    this.load.image("background2", "./assets/images/gameoverscene/gameover.png");
    this.load.audio("gameover", "./assets/audio/gameover.mp3");
    this.inputKeys = this.input.keyboard.addKeys({
      start: Phaser.Input.Keyboard.KeyCodes.E,
    });
  }
  create() {
    var bg = this.add.sprite(0, 0, "background2");
    bg.setOrigin(0, 0);

    // var play = this.add.sprite(193, 350, "play_button");
    // bg.setOrigin(0, 0);
    // play.setScale(0.2);

    // var text = this.add.text(77, 100, "CAVES");
    // text.setOrigin(0, 0);
    // text.setScale(5);

    // text.setOrigin(0, 0);
    // text.setScale(1);

    var music = this.sound.add("gameover");
    music.play();
  }

  update() {
    if (this.inputKeys.start.isDown) {
      // console.log("buttonE is pressed");
      this.registry.destroy(); // destroy registry
      this.events.off(); // disable all active events
      this.scene.start("MenuScene");
    }
  }
}
export default GameoverScene;

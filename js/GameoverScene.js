class GameoverScene extends Phaser.Scene {
  constructor() {
    super("GameoverScene");
    this.scoreText, this.score;
  }

  init(data) {
    console.log(data);
    this.score = data.score;
    console.log(this.score);
  }

  preload() {
    this.load.image(
      "background2",
      "./assets/images/gameoverscene/gameover.png"
    );
    this.load.audio("gameover", "./assets/audio/gameover.mp3");
    this.inputKeys = this.input.keyboard.addKeys({
      start: Phaser.Input.Keyboard.KeyCodes.E,
    });
  }

  create() {
    var bg = this.add.sprite(0, 0, "background2");
    bg.setOrigin(0, 0);

    this.scoreText = this.add.text(174, 372, `${this.score}`, {
      fontSize: "32px",
      fill: "#fff",
    });

    var music = this.sound.add("gameover");
    music.play();

    // Add touch input to reset the game
    this.input.on("pointerdown", () => {
      this.resetGame();
    });

    // Existing keyboard input to reset the game
    this.input.keyboard.on("keydown-E", () => {
      this.resetGame();
    });
  }

  update() {
    if (this.inputKeys.start.isDown) {
      this.resetGame();
    }
  }

  resetGame() {
    this.scene.start("MenuScene");
    this.sound.get("gameover").stop();
    window.location.reload();
  }

  shutdown() {
    if (this.music) {
      this.music.stop();
      this.music = null;
    }
  }
}
export default GameoverScene;

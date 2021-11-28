class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  preload() {
    this.load.image("background", "./assets/images/menuscene/title_bg.png");
    this.load.image("play_button", "./assets/images/menuscene/play_button.png");
    this.load.audio("title_music", "./assets/audio/title_music.mp3");
    this.inputKeys = this.input.keyboard.addKeys({
      start: Phaser.Input.Keyboard.KeyCodes.E,
    });
  }
  create() {
    var bg = this.add.sprite(0, 0, "background");
    bg.setOrigin(0, 0);

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
  }

  update() {
    if (this.inputKeys.start.isDown) {
      this.sound.get("title_music").stop();
      // console.log("buttonE is pressed");
      this.sound.get("title_music").stop();
      this.scene.start("SceneOne");
    }
  }
}
export default MenuScene;

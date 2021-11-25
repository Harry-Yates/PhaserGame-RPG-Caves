class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  preload() {
    this.load.image("background", "./assets/images/menuscene/title_bg.jpg");
    this.load.image("play_button", "./assets/images/menuscene/play_button.png");
    this.load.audio("title_music", "./assets/audio/title_music.mp3");
  }
  create() {
    var bg = this.add.sprite(0, 0, "background");
    bg.setOrigin(0, 0);

    var play = this.add.sprite(193, 400, "play_button");
    bg.setOrigin(0, 0);
    play.setScale(0.4);

    var text = this.add.text(77, 100, "CAVES");
    text.setOrigin(0, 0);
    text.setScale(5);

    var text = this.add.text(
      30,
      210,
      `Enter the wrong cave or nook and you will DIE.

           Look for angel statues to guide you.

                 CONTROLS: W A S D`,
      {
        fontFamily: "Arial",
        fontSize: 15,
        padding: 10,
        color: "#FFF",
        wordWrap: { width: 360 },
      }
    );
    text.setOrigin(0, 0);
    text.setScale(1);

    var music = this.sound.add("title_music");
    // music.play();
  }
}
export default MenuScene;

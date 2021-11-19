import Player from "./Player.js";

export default class SceneOne extends Phaser.Scene {
  constructor() {
    super("SceneOne");
  }

  preload() {
    Player.preload(this);
  }

  create() {
    this.player = new Player({ scene: this, x: 180, y: 480, texture: "main_character", frame: "u1" });
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    this.player.update();
  }
}

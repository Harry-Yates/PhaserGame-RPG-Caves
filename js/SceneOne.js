import Player from "./Player.js";

export default class SceneOne extends Phaser.Scene {
  constructor() {
    super("SceneOne");
  }

  preload() {
    Player.preload(this);
    this.load.image("tiles", "./assets/images/map-environment/dirt.png");
    this.load.tilemapTiledJSON("map", "./assets/images/map-environment/opening-scene-map.json");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("dirt", "tiles", 32, 32, 0, 0);
    const layer1 = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);
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

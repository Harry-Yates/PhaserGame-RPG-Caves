import Player from "./Player.js";

export default class SceneOne extends Phaser.Scene {
  constructor() {
    super("SceneOne");
  }

  preload() {
    Player.preload(this);
    this.load.image("dirt", "./assets/images/map-environment/dirt.png");
    this.load.image("elements", "./assets/images/map-environment/elements.png");
    this.load.tilemapTiledJSON("map", "./assets/images/map-environment/opening-scene-map.json");
  }

  create() {
    // this.scale.displaySize.setAspectRatio(width / height);
    // this.scale.refresh();
    const map = this.make.tilemap({ key: "map" });
    const groundDirt = map.addTilesetImage("dirt", "dirt", 32, 32, 0, 0);
    const groundObjects = map.addTilesetImage("elements", "elements", 32, 32, 0, 0);
    const layer1 = map.createStaticLayer("Tile Layer 1", groundDirt, 0, 0);
    const layer2 = map.createStaticLayer("Tile Layer 2", groundObjects, 0, 0);
    layer1.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);
    layer2.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer2);
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

import Player from "./Player.js";
import Treasure from "./Treasure.js";

export default class SceneOne extends Phaser.Scene {
  constructor() {
    super("SceneOne");
  }

  preload() {
    Player.preload(this);
    Treasure.preload(this);
    this.load.image("dirt", "./assets/images/map-environment/dirt.png");
    this.load.image("elements", "./assets/images/map-environment/elements.png");
    this.load.image("resources", "./assets/images/map-environment/resources.png");
    this.load.tilemapTiledJSON("map", "./assets/images/map-environment/opening-scene-map.json");
  }

  create() {
    // this.scale.displaySize.setAspectRatio(width / height);
    // this.scale.refresh();
    const map = this.make.tilemap({ key: "map" });
    this.map = map;
    const groundDirt = map.addTilesetImage("dirt", "dirt", 32, 32, 0, 0);
    const groundObjects = map.addTilesetImage("elements", "elements", 32, 32, 0, 0);
    const resources = map.addTilesetImage("resources", "resources", 32, 32, 0, 0);
    const layer1 = map.createLayer("Tile Layer 1", groundDirt, 0, 0);
    const layer2 = map.createLayer("Tile Layer 2", groundObjects, 0, 0);
    const layer3 = map.createLayer("Tile Layer 3", resources, 0, 0);
    layer1.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);
    layer2.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer2);
    layer3.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer3);
    this.map.getObjectLayer("Treasure").objects.forEach((treasure) => new Treasure({ scene: this, treasure }));
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

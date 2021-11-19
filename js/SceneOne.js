import Player from "./Player.js";

export default class SceneOne extends Phaser.Scene {
  constructor() {
    super("SceneOne");
  }

  preload() {
    Player.preload(this);
    this.load.image("dirt", "./assets/images/map-environment/dirt.png");
    this.load.image("elements", "./assets/images/map-environment/elements.png");
    this.load.image("resources", "./assets/images/map-environment/resources.png");
    this.load.tilemapTiledJSON("map", "./assets/images/map-environment/opening-scene-map.json");
    this.load.atlas("treasure", "./assets/images/treasure/treasure.png", "./assets/images/treasure/treasure_atlas.json");
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

    // let coins = new Phaser.Physics.Matter.Sprite(this.matter.world, 50, 50, "treasure", "coins");
    // let chest = new Phaser.Physics.Matter.Sprite(this.matter.world, 150, 150, "treasure", "chest");
    // coins.setStatic(true);
    // chest.setStatic(true);
    // this.add.existing(coins);
    // this.add.existing(chest);

    this.addTreasure();

    this.player = new Player({ scene: this, x: 180, y: 480, texture: "main_character", frame: "u1" });
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  addTreasure() {
    const treasure = this.map.getObjectLayer("Treasure");
    treasure.objects.forEach((treasure) => {
      let treItem = new Phaser.Physics.Matter.Sprite(this.matter.world, treasure.x, treasure.y, "treasure", treasure.type);

      // const { Body, Bodies } = Phaser.Physics.Matter.Matter;
      // var circleCollider = Bodies.circle(resItem.x, resItem.y, 12, { isSensor: false, label: "collider" });
      // treItem.setExistingBody(circleCollider);

      treItem.setStatic(true);
      this.add.existing(treItem);
    });
  }

  update() {
    this.player.update();
  }
}

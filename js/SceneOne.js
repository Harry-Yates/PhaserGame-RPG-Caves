import Player from "./Player.js";
import Treasure from "./Treasure.js";
import Enemy from "./Enemy.js";

export default class SceneOne extends Phaser.Scene {
  constructor() {
    super("SceneOne");
    this.enemies = [];
  }

  preload() {
    Player.preload(this);
    Enemy.preload(this);
    Treasure.preload(this);
    this.load.image("dirt", "./assets/images/map-environment/dirt.png");
    this.load.image("elements", "./assets/images/map-environment/elements.png");
    this.load.image("resources", "./assets/images/map-environment/resources.png");
    this.load.tilemapTiledJSON("map", "./assets/images/map-environment/opening-scene-map.json");
    this.load.atlas("portal", "./assets/images/portal/portal.png", "./assets/images/portal/portal_atlas.json");
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
    this.map.getObjectLayer("Enemies").objects.forEach((enemy) => this.enemies.push(new Enemy({ scene: this, enemy })));

    this.addPortal();

    this.player = new Player({ scene: this, x: 180, y: 480, texture: "main_character", frame: "u1" });
    // this.player.setScale(1.5);
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    // let camera = this.cameras.main;
    // camera.zoom = 1.6;
    // camera.startFollow(this.player);
    // camera.setLerp(0.1, 0.1);
    // camera.setBounds(0, 0, this.game.config.width, this.game.config.height);
  }

  //MOVE BETWEEN PORTALS
  addPortal() {
    const portal = this.map.getObjectLayer("Portal");
    portal.objects.forEach((portal) => {
      let portalItem = new Phaser.Physics.Matter.Sprite(this.matter.world, portal.x, portal.y, "portal", portal.type);
      let yOrigin = portal.properties.find((p) => p.name == "yOrigin").value;
      portalItem.x += portalItem.width / 2;
      portalItem.y -= portalItem.height / 2;
      portalItem.y = portalItem.y + portalItem.height * (yOrigin - 0.5);

      const { Body, Bodies } = Phaser.Physics.Matter.Matter;
      var circleCollider = Bodies.circle(portalItem.x, portalItem.y, 3, { isSensor: false, label: "collider" });
      portalItem.setExistingBody(circleCollider);
      portalItem.setStatic(true);
      portalItem.setOrigin(0.5, yOrigin);
      this.add.existing(portalItem);
    });
  }

  update() {
    this.enemies.forEach((enemy) => enemy.update());
    this.player.update();
  }
}

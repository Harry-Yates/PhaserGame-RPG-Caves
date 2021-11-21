import MatterEntity from "./MatterEntity.js";

export default class Player extends MatterEntity {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super({ ...data, health: 2, drops: [], name: "player" });
    this.touching = [];

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    var playerCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: "'playerCollider'" });
    var playerSensor = Bodies.circle(this.x, this.y, 24, { isSensor: true, label: "playerSensor" });
    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
    this.createTreasureCollisions(playerSensor);
    this.interactionCollision(playerCollider);
  }

  static preload(scene) {
    scene.load.atlas("main_character", "./assets/images/main-character/main_character.png ", "./assets/images/main-character/main_character_atlas.json");
    scene.load.animation("main_character", "./assets/images/main-character/main_character_anim.json");
    scene.load.spritesheet("items", "./assets/images/items/items.png", { frameWidth: 32, frameHeight: 32 });
    scene.load.audio("player", "./assets/audio/hit.wav");
  }

  update() {
    const speed = 3.5;
    let playerVelocity = new Phaser.Math.Vector2();
    if (this.inputKeys.left.isDown) {
      this.anims.play("walk_left", true);
      this.collectTreasure();
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      this.anims.play("walk_right", true);
      this.collectTreasure();
      playerVelocity.x = 1;
    }
    if (this.inputKeys.up.isDown) {
      this.anims.play("walk_up", true);
      this.collectTreasure();
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      this.anims.play("walk_down", true);
      this.collectTreasure();
      playerVelocity.y = 1;
    }
    if (this.inputKeys.down.isUp && this.inputKeys.up.isUp && this.inputKeys.left.isUp && this.inputKeys.right.isUp) {
      this.anims.stop();
    }

    playerVelocity.normalize();
    //normalize makes sure the magnitude of the vector is 1 for the diagonal movement
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);
  }

  createTreasureCollisions(playerSensor) {
    this.scene.matterCollision.addOnCollideStart({
      objectA: [playerSensor],
      callback: (other) => {
        if (other.bodyB.isSensor) return;
        this.touching.push(other.gameObjectB);
        console.log(this.touching.length, other.gameObjectB.name);
      },
      context: this.scene,
    });

    this.scene.matterCollision.addOnCollideEnd({
      objectA: [playerSensor],
      callback: (other) => {
        this.touching = this.touching.filter((gameObject) => gameObject != other.gameObjectB);
        console.log(this.touching.length);
      },
      context: this.scene,
    });
  }

  interactionCollision(playerCollider) {
    this.scene.matterCollision.addOnCollideStart({
      objectA: [playerCollider],
      callback: (other) => {
        if (other.gameObjectB && other.gameObjectB.pickup) other.gameObjectB.pickup();
      },
      context: this.scene,
    });

    this.scene.matterCollision.addOnCollideActive({
      objectA: [playerCollider],
      callback: (other) => {
        if (other.gameObjectB && other.gameObjectB.pickup) other.gameObjectB.pickup();
      },
      context: this.scene,
    });
  }

  collectTreasure() {
    this.touching = this.touching.filter((gameObject) => gameObject.hit && !gameObject.dead);
    this.touching.forEach((gameobject) => {
      gameobject.hit();
      if (gameobject.dead) gameobject.destroy();
    });
  }
}

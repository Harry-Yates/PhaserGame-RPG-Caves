export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.touching = [];
    this.scene.add.existing(this);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    var playerCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: "'playerCollider'" });
    var playerSensor = Bodies.circle(this.x, this.y, 24, { isSensor: true, label: "playerSensor" });
    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });
    this.createTreasureCollisions(playerSensor);
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
  }

  static preload(scene) {
    scene.load.atlas("main_character", "./assets/images/main-character/main_character.png ", "./assets/images/main-character/main_character_atlas.json");
    scene.load.animation("main_character", "./assets/images/main-character/main_character_anim.json");
    scene.load.spritesheet("items", "./assets/images/items/items.png", { frameWidth: 32, frameHeight: 32 });
  }

  update() {
    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();
    if (this.inputKeys.left.isDown) {
      this.anims.play("walk_left", true);
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      this.anims.play("walk_right", true);
      playerVelocity.x = 1;
    }
    if (this.inputKeys.up.isDown) {
      this.anims.play("walk_up", true);
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      this.anims.play("walk_down", true);
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
}

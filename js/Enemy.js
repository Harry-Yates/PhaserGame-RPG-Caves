import MatterEntity from "./MatterEntity.js";

export default class Enemy extends MatterEntity {
  static preload(scene) {
    scene.load.atlas(
      "enemies",
      "./assets/images/enemies/enemies.png",
      "./assets/images/enemies/enemies_atlas.json"
    );
    scene.load.animation(
      "enemies_anim",
      "./assets/images/enemies/enemies_anim.json"
    );
    scene.load.audio("golem", "./assets/audio/golem.wav");
    scene.load.audio("troll", "./assets/audio/troll.wav");
  }

  constructor(data) {
    let { scene, enemy } = data;
    let drops = JSON.parse(
      enemy.properties.find((p) => p.name == "drops").value
    );
    let health = enemy.properties.find((p) => p.name == "health").value;
    super({
      scene,
      x: enemy.x,
      y: enemy.y,
      texture: "enemies",
      frame: `${enemy.name}_idle_1`,
      drops,
      health,
      name: enemy.name,
    });

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    var enemyCollider = Bodies.circle(this.x, this.y, 20, {
      isSensor: false,
      label: "'enemyCollider'",
    });
    var enemySensor = Bodies.circle(this.x, this.y, 150, {
      isSensor: true,
      label: "enemySensor",
    });
    const compoundBody = Body.create({
      parts: [enemyCollider, enemySensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
    this.scene.matterCollision.addOnCollideStart({
      objectA: [enemySensor],
      callback: (other) => {
        if (other.gameObjectB && other.gameObjectB.name == "player")
          this.attacking = other.gameObjectB;
      },
      context: this.scene,
    });
  }

  attack = (target) => {
    if (target.dead || this.dead) {
      clearInterval(this.attacktimer);
      return;
    }
    target.hit();
  };

  update() {
    if (this.dead || !this.attacking) return;
    if (this.attacking && this.attacking.position) {
      let direction = this.attacking.position.subtract(this.position);
      if (direction) {
        if (direction.length() > 24) {
          let v = direction.normalize();
          if (v) {
            this.setVelocityX(v.x);
            this.setVelocityY(v.y);
            if (this.attacktimer) {
              clearInterval(this.attackTimer);
              this.attacktimer = null;
            }
          }
        } else {
          if (this.attacktimer == null) {
            this.attacktimer = setInterval(this.attack, 500, this.attacking);
          }
        }
      }
    }
    this.setFlipX(this.velocity.x < 0);
    if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
      this.anims.play(`${this.name}_walk`, true);
    } else {
      this.anims.play(`${this.name}_idle`, true);
    }
  }
}

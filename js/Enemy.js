import MatterEntity from "./MatterEntity.js";

export default class Enemy extends MatterEntity {
  static preload(scene) {
    scene.load.atlas("enemies", "./assets/images/enemies/enemies.png", "./assets/images/enemies/enemies_atlas.json");
    scene.load.animation("enemies_anim", "./assets/images/enemies/enemies_anim.json");
    scene.load.audio("golem", "./assets/audio/golem.wav");
    scene.load.audio("troll", "./assets/audio/troll.wav");
  }

  constructor(data) {
    let { scene, enemy } = data;
    let drops = JSON.parse(enemy.properties.find((p) => p.name == "drops").value);
    let health = enemy.properties.find((p) => p.name == "health").value;
    super({ scene, x: enemy.x, y: enemy.y, texture: "enemies", frame: `${enemy.name}_idle_1`, drops, health, name: enemy.name });
  }

  update() {
    console.log("enemy update");
  }
}

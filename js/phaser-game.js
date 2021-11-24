import SceneOne from "./SceneOne.js";
import Scene2 from "./Scene2.js";
import Scene3 from "./Scene3.js";

const config = {
  width: 384,
  height: 512,
  backgroundColor: "#333333",
  type: Phaser.AUTO,
  parent: "phaser-game",
  scene: [SceneOne, Scene2, Scene3],
  // scene: [SceneOne],
  // scene: [Scene3],
  scale: {
    // mode: Phaser.Scale.FIT,
    zoom: 1.5,
  },
  physics: {
    default: "matter",
    matter: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  // Install the scene plugin
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin.default, // The plugin class
        key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
        mapping: "matterCollision", // Where to store in the Scene, e.g. scene.matterCollision

        // Note! If you are including the library via the CDN script tag, the plugin
        // line should be:
        // plugin: PhaserMatterCollisionPlugin.default
      },
    ],
  },
};

const game = new Phaser.Game(config);

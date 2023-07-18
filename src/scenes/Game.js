import Phaser from 'phaser';
import Player from '../entities/Player.js';


class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image("neoquest_tileset", "/assets/tiles/overworld.png");
    this.load.tilemapTiledJSON(
      "overworld-map",
      "/assets/overworld.json",
    );
    this.load.spritesheet("player", "/assets/tiles/lupe.png", {
      frameWidth: 40,
      frameHeight: 40,
    });
  }

  create(data) {
    const overworldTilemap = this.make.tilemap({ key: "overworld-map" });
    overworldTilemap.addTilesetImage("neoquest_tileset", "neoquest_tileset");
    for (let i = 0; i < overworldTilemap.layers.length; i++) {
      const layer = overworldTilemap.createLayer(i, "neoquest_tileset", 0, 0);
    }

    const playerSprite = new Player(this, 0, 0, "player");
    // Offset the camera to adjust for the sprite's origin
    const cameraOffsetX = playerSprite.width / 2;
    const cameraOffsetY = playerSprite.height / 2;

    this.cameras.main.startFollow(playerSprite, true, 1, 1, -cameraOffsetX, -cameraOffsetY);


    const gridEngineConfig = {
      characters: [
        {
          id: "player",
          sprite: playerSprite,
          startPosition: { x: 58, y: 11 },
        },
      ],
    };
    this.gridEngine.create(overworldTilemap, gridEngineConfig);

    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  update(time, delta) {

    let playerPosition = this.gridEngine.getPosition("player");

    if (Phaser.Input.Keyboard.JustDown(this.a)) {
      if (!this.gridEngine.isBlocked({ x: playerPosition.x - 1, y: playerPosition.y })) {
        this.gridEngine.setPosition("player", { x: playerPosition.x - 1, y: playerPosition.y });
      }
    } else if (Phaser.Input.Keyboard.JustDown(this.d)) {
      if (!this.gridEngine.isBlocked({ x: playerPosition.x + 1, y: playerPosition.y })) {
        this.gridEngine.setPosition("player", { x: playerPosition.x + 1, y: playerPosition.y });
      }
    } else if (Phaser.Input.Keyboard.JustDown(this.w)) {
      if (!this.gridEngine.isBlocked({ x: playerPosition.x, y: playerPosition.y - 1 })) {
        this.gridEngine.setPosition("player", { x: playerPosition.x, y: playerPosition.y - 1 });
      }
    } else if (Phaser.Input.Keyboard.JustDown(this.s)) {
      if (!this.gridEngine.isBlocked({ x: playerPosition.x, y: playerPosition.y + 1 })) {
        this.gridEngine.setPosition("player", { x: playerPosition.x, y: playerPosition.y + 1 });
      }
    }
  }
}

export default Game;
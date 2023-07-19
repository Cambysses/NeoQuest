import Phaser from 'phaser';
import Player from '../entities/Player.js';


export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        this.load.image("neoquest_tileset", "/assets/tiles/overworld.png");
        this.load.tilemapTiledJSON(
            "overworld-map",
            "/assets/overworld.json",
        );
        this.load.tilemapTiledJSON(
            "dank-cave-map",
            "/assets/dank_cave.json",
        );
        this.load.spritesheet("player", "/assets/tiles/lupe.png", {
            frameWidth: 40,
            frameHeight: 40,
        });
    }

    create(data) {
        this.player = new Player(this, 0, 0, "player");
        this.scene.launch('Overworld', { tilemapKey: 'overworld-map', startPosition: { x: 43, y: 5 } });
        this.instantiateCamera();
    }

    update(time, delta) {

    }

    changeMap(oldScene, newScene, tilemapKey, startPosition) {
        this.scene.stop(oldScene).launch(newScene, { tilemapKey: tilemapKey, startPosition: startPosition });
    }

    instantiateCamera() {
        const cameraOffsetX = this.player.width / 2;
        const cameraOffsetY = this.player.height / 2;
        this.cameras.main.startFollow(this.player, true, 1, 1, -cameraOffsetX, -cameraOffsetY);
    }
}
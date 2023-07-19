import Phaser from 'phaser';


export default class LevelScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    init(data) {
        this.mainScene = this.scene.get('MainScene');
        this.mainScene.events.on('update', this.update, this);
        this.initializeTilemap(data.tilemapKey, data.startPosition);
    }

    preload() {
    }

    initializeTilemap(tilemapKey, startPosition) {
        const tilemap = this.mainScene.make.tilemap({ key: tilemapKey });
        tilemap.addTilesetImage("neoquest_tileset", "neoquest_tileset");
        tilemap.createLayer(0, "neoquest_tileset", 0, 0);

        const gridEngineConfig = {
            characters: [
                {
                    id: "player",
                    sprite: this.mainScene.player,
                    startPosition: startPosition,
                },
            ],
        };
        this.mainScene.gridEngine.create(tilemap, gridEngineConfig);
    }
}
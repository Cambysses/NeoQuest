import Phaser from 'phaser';
import PlayerStats from './PlayerStats';

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(mainScene, x, y) {
        super(mainScene, x, y, 'player', 0);
        this.mainScene = mainScene;
        this.mainScene.events.on('update', this.update, this);
        this.gridEngine = mainScene.gridEngine;
        this.mainScene.add.existing(this);

        this.w = this.mainScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.a = this.mainScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.s = this.mainScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.d = this.mainScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.scene.input.keyboard.on('keydown', () => this.handleInput());

        this.playerStats = new PlayerStats();
    }

    update(time, delta) {
    }

    handleInput() {
        let playerPosition = this.getPosition();
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

        this.mainScene.events.emit('playerMoved');

        document.querySelector('#positionRow').innerText = `X: ${this.getPosition().x} Y: ${this.getPosition().y}`;
    }

    getPosition() {
        return this.gridEngine.getPosition("player");
    }
}
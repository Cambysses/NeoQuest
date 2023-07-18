import Phaser from 'phaser';

class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player', 0);
        scene.add.existing(this);
        this.setOrigin(0, 0);
    }

    preUpdate(time, delta) {
    }
}

export default Player;
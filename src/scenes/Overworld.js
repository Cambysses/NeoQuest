import LevelScene from './LevelScene';

export default class Overworld extends LevelScene {

  constructor() {
    super({ key: 'Overworld' });
  }

  create(data) {
    this.mainScene.events.addListener('playerMoved', this.lookForMapChange, this);
  }

  update(time, delta) {

  }

  lookForMapChange() {
    let playerPosition = this.mainScene.player.getPosition();
    if (playerPosition.x === 43 && playerPosition.y === 6) {
      this.mainScene.changeMap(this, 'DankCave', 'dank-cave-map', { x: 2, y: 2 });
    }
  }
}
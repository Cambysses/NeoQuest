import LevelScene from './LevelScene';

export default class DankCave extends LevelScene {

  constructor() {
    super({ key: 'DankCave' });
  }

  create(data) {
    this.mainScene.events.addListener('playerMoved', this.lookForMapChange, this);
  }

  update(time, delta) {

  }

  lookForMapChange() {
    let playerPosition = this.mainScene.player.getPosition();
    if (playerPosition.x === 2 && playerPosition.y === 2) {
      this.mainScene.changeMap(this, 'Overworld', 'overworld-map', { x: 43, y: 6 });
    }
  }
}
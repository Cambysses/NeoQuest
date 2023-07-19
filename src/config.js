import Phaser from 'phaser';

import GridEngine from "grid-engine";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

import MainScene from './scenes/MainScene';
import Overworld from './scenes/Overworld';
import DankCave from './scenes/DankCave';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#33A5E7',
  scene: [MainScene, Overworld, DankCave],
  scale: {
    width: 280,
    height: 280,
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    pixelArt: true,
  },
  plugins: {
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine",
      },
      {
        key: "rexUI",
        plugin: RexUIPlugin,
        mapping: "rexUI",
      },
    ],
  },
};

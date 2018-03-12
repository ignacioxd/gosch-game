import BaseScene from './BaseScene';
import FireMonster from 'objects/characters/FireMonster';
import IceMonster from 'objects/characters/IceMonster';
import SpiderMonster from 'objects/characters/SpiderMonster';
import GolemMonster from 'objects/characters/GolemMonster';
import Priest from 'objects/characters/Priest';
import Knight from 'objects/characters/Knight';

export default class DemoScene extends BaseScene {

  constructor() {
    super({ key: 'DemoScene' });
  }

  preload() {
    this.input.keyboard.on('keydown_ESC', function () {
      if (this.sys.isActive()) this.sys.pause();
      else this.sys.resume();
    }, this);

    this.input.keyboard.on('keydown_Q', function () {
      const sampleDialog = 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...';
      this.sys.game.scene.keys.DialogScene.setDialogText(sampleDialog);
    }, this);

    this.map1 = this.add.tilemap('grass_area');
    this.tileset1 = this.map1.addTilesetImage('Map_tileset', 'map_tiles');
    this.layer1 = this.map1.createStaticLayer('Grass Layer', this.tileset1, -800, -600);

    this.add.text(-390, -300, 'Use the arrow keys for motion, spacebar to attack, k to die', {
      font: '16px Arial',
      fill: '#ffffff'
    });
  }

  create() {
    this.priest = new Priest(this, -100, 0);
    this.fireMonster = new FireMonster(this, 100, 100);
    this.iceMonster = new IceMonster(this, 100, -100);
    this.spiderMonster = new SpiderMonster(this, -300, 100);
    this.golemMonster = new GolemMonster(this, -300, -100);
    this.knight = new Knight(this, -100, 100);

    this.cameras.main.startFollow(this.priest);

    this.fightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.deathKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.on('pointerdown', function(event) {
      if(event.buttons === 1) {
        this.priest.moveTo(this.input.x, this.input.y);
      }
    }, this)

  }

  update() {
    let direction = null;
    let animation = 'walk';
    if (this.cursors.up.isDown) {
      direction = 'N';
      if (this.cursors.left.isDown) { //NW
        direction += 'W';
      }
      else if (this.cursors.right.isDown) { //NE
        direction += 'E';
      }
    }
    else if (this.cursors.down.isDown) {
      direction = 'S';
      if (this.cursors.left.isDown) { //NW
        direction += 'W';
      }
      else if (this.cursors.right.isDown) { //NE
        direction += 'E';
      }
    }
    else if (this.cursors.left.isDown) { //W
      direction = 'W';
    }
    else if (this.cursors.right.isDown) { //E
      direction = 'E';
    }
    else {
      animation = 'stance';
    }

    if(this.fightKey.isDown) {
      animation = 'fight';
    }

    if(this.deathKey.isDown) {
      animation = 'death';
    }

    this.iceMonster.setAnimation(animation, direction);
    this.fireMonster.setAnimation(animation, direction);
    this.spiderMonster.setAnimation(animation, direction);
    this.golemMonster.setAnimation(animation, direction);
    this.knight.setAnimation(animation, direction);

    this.priest.update();
  }
}
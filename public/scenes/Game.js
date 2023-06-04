import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene
{
    player;

    ground;

    constructor()
    {
        super('game');
    }

    init()
    {

    }

    preload()
    {
        this.load.image('background', 'assets/bg_layer1.png');
        this.load.image('player_walk_1', 'assets/bunny1_walk1.png');
        this.load.image('ground', 'assets/ground_grass.png');

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create()
    {
        let { width, height } = this.sys.game.canvas;

        this.add.image(width / 2, height / 2, 'background');

        this.player = this.physics.add.sprite(100, height - 200, 'player_walk_1').setScale(0.5);

        this.ground = this.physics.add.staticSprite(width / 2, height, 'ground').setScale(2);

        this.ground.body.updateFromGameObject();

        this.physics.add.collider(this.player, this.ground);
    }

    update()
    {
        let touchingDown = this.player.body.touching.down;

        if (this.cursors.up.isDown && touchingDown)
        {
            this.player.setVelocityY(-300);
        }

        if (this.cursors.down.isDown && !touchingDown)
        {
            this.player.setVelocityY(400);
        }

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-200);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(200);
        } 
        else
        {
            this.player.setVelocityX(0);
        }
    }
}
// Init Game Components
let sky;
let ground;
let wave;
let waterSprite;
let spikes;
let spikeSprite;
let flagPole;
let flagSprite;
let diamonds;
let diamondSprite;

let player;
let cursors;


class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene")
    }

    init() {

    }

    preload() {

        // Loading Tilemap Components
        this.load.image('textures', '../assets/textures/texture_sheet.png');
        this.load.tilemapTiledJSON('tilemap', '../assets/tilemaps/tilemap.json');

        // Loading Player
        this.load.spritesheet('player', '../assets/images/player.png', {frameWidth:20, frameHeight:18});

        // Loading Interactibles
        this.load.image('spike', '../assets/textures/spike.png');
        this.load.image('water', '../assets/textures/water.png');
        this.load.image('flag', '../assets/textures/flag.png');
        this.load.image('diamond', '../assets/textures/diamond.png');

        // Audio
        this.load.audio('jump_sfx', '../assets/sfx/jump_sfx.mp3');
        this.load.audio('pickup_sfx', '../assets/sfx/pickup_sfx.mp3');
        this.load.audio('damage_sfx', '../assets/sfx/dmg_sfx.mp3');
        this.load.audio('bgm', '../assets/music/bgm.mp3');

    }

    create() {

        // Setting Tilemap & Background
        let map = this.make.tilemap({ key: 'tilemap'});
        let tileset = map.addTilesetImage('tileset', 'textures');
        
        sky = map.createLayer('sky', tileset);

        ground = map.createStaticLayer('ground', tileset);
        ground.setCollisionByProperty({ collides: true });

        // Audio SFX and Config
        this.jumpSFX = this.sound.add('jump_sfx');
        this.pickupSFX = this.sound.add('pickup_sfx');
        this.damageSFX = this.sound.add('damage_sfx');
        this.bgm = this.sound.add('bgm');

        this.sfxConfig = {
            mute: false,
            volume: 0.3
        };
        
        this.musicConfig = {
            mute: false,
            volume: 0.1,
            loop: true
        };

        this.bgm.play(this.musicConfig);

        // Player
        player = this.physics.add.sprite(60,250, 'player');
        player.setBounce(0);
        //player.setCollideWorldBounds(true); 
        this.physics.add.collider(player,ground);

        // Player Interactibles

            //Spikes
            spikes = this.physics.add.group({
                allowGravity: false,
                immovable: true
            });
            map.getObjectLayer('spikes').objects.forEach((spike) => {
            spikeSprite = spikes.create(spike.x + 9, spike.y + 10 - spike.height, 'spike');
            spikeSprite.body.setSize(spike.width, spike.height - 10).setOffset(0,10);
            });
            this.physics.add.collider(player, spikes, spikeDmg, null, this);
            
            //Water
            wave = this.physics.add.group({
                allowGravity: false,
                immovable: true
            });
            map.getObjectLayer('water').objects.forEach((water) => {
                waterSprite = wave.create(water.x + 9, water.y + 10 - water.height, 'water');
            });
            this.physics.add.collider(player, wave, waterDmg, null, this);

            //Flag
            flagPole = this.physics.add.group({
                allowGravity: false,
                immovable: true,
            });
            map.getObjectLayer('flag').objects.forEach((flag) => {
                flagSprite = flagPole.create(flag.x + 9, flag.y - (flag.height + 9), 'flag');
            });
            this.physics.add.collider(player, flagPole, goal, null, this);

            //Diamonds
            diamonds = this.physics.add.group({
                allowGravity: false,
                immovable: true
            });
            map.getObjectLayer('diamonds').objects.forEach((diamond) => {
            diamondSprite = diamonds.create(diamond.x + 9, diamond.y + 10 - diamond.height,'diamond');
            });
            this.physics.add.overlap(player, diamonds, getDiamonds, null, this);
            

        // Player Animations
        this.anims.create({
            key: 'left',
            frames: [ { key: 'player', frame: 1 } ],
            frameRate: 1
        });
            
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 0 } ],
            frameRate: 1
        });
            
        this.anims.create({
            key: 'right',
            frames: [ { key: 'player', frame: 2 } ],
            frameRate: 1
        });    
        
        // Keybinds
        cursors = this.input.keyboard.createCursorKeys();

        // Camera
        this.cameras.main.startFollow(player);
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels);

        // Lives and Score Text
        livesText = this.add.text(16,16, 'Lives: ' + lives, { font: '16px monospace', fill : '#000000'});
        livesText.setScrollFactor(0);
        scoreText = this.add.text(280,16, 'Diamonds Collected: ' + score + '\nScore: ' + (score*10), { font: '16px monospace', fill : '#000000'});
        scoreText.setScrollFactor(0);
    }

    update() { 

        if (cursors.left.isDown) {
            player.setVelocityX(-120);
            player.anims.play('left', true);
        }
    
        else if (cursors.right.isDown) {
            player.setVelocityX(120);
            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.blocked.down) {
            this.jumpSFX.play(this.sfxConfig);
            player.setVelocityY(-250);
        }

    }

}
class OverScene extends Phaser.Scene {

    constructor() {
        super("OverScene")
    }

    init() {

    }

    preload() {

        // Loading Images
        this.load.image('bg', '../assets/images/background.png');
        this.load.image('over', '../assets/images/titles/game_over.png');

        // Buttons
        this.load.image('again1', '../assets/images/buttons/again_u.png');
        this.load.image('again2', '../assets/images/buttons/again_p.png');
        this.load.image('menu1', '../assets/images/buttons/menu_u.png');
        this.load.image('menu2', '../assets/images/buttons/menu_p.png');

        //Audio
        this.load.audio('hover_sfx', '../assets/sfx/hover_sfx.mp3');
        this.load.audio('click_sfx', '../assets/sfx/click_sfx.mp3');
        this.load.audio('lose_sfx', '../assets/sfx/lose_sfx.mp3');

    }

    create() {

        // Background
        background = this.add.tileSprite(240, 180, 486, 360, 'bg');

        // Audio SFX and Config
        this.hoverSFX = this.sound.add('hover_sfx');
        this.clickSFX = this.sound.add('click_sfx');
        this.loseSFX = this.sound.add('lose_sfx');
        this.sfxConfig = {
            mute: false,
            volume: 0.3
        };

        this.loseSFX.play();

        // Game Title
        this.add.image(240,80,'over').setScale(0.8);

        // Score
        scoreText = this.add.text(240,130, 'DC: ' + score + '  Score: ' + (score*10), { font: '18px monospace', fill : '#000000'}).setOrigin(0.5);

        // Play Again Button
        againButton = this.add.image(240,170, 'again1').setInteractive({useHandCursor: true});
        againButton.on('pointerover', () => againButton.setTexture('again2'));
        againButton.on('pointerover', () => this.hoverSFX.play(this.sfxConfig));
        againButton.on('pointerout', () => againButton.setTexture('again1'));
        againButton.on('pointerdown', () => {this.clickSFX.play(); score = 0; lives = 3});
        againButton.on('pointerdown', () => this.againButton());

        // Main Menu Button
        menuButton = this.add.image(240,220, 'menu1').setInteractive({useHandCursor: true});
        menuButton.on('pointerover', () => menuButton.setTexture('menu2'));
        menuButton.on('pointerover', () => this.hoverSFX.play(this.sfxConfig));
        menuButton.on('pointerout', () => menuButton.setTexture('menu1'));
        menuButton.on('pointerdown', () => {this.clickSFX.play(); score = 0; lives = 3});
        menuButton.on('pointerdown', () => this.menuButton());

    }

    update() {

       // Moving Background
       background.tilePositionX += 0.25; 

    }

    // Button Interactions
    againButton() {
        this.scene.start("GameScene");
    }

    menuButton() {
        this.scene.start("MenuScene");
    }

}
// Setting Game Configuration

let config = {
    type: Phaser.AUTO,
    width: 480,
    height: 360,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 350 },
            debug: false
        }
    },
    scene: [
        MenuScene,
        GameScene,
        CreditScene,
        ControlScene,
        WinScene,
        OverScene
    ]
};

let game = new Phaser.Game(config);

game.scene.start("MenuScene");

// Initializing Variables

    // Menu and UI Components
        let background;
        let playButton;
        let credButton;
        let contButton;
        let backButton;
        let againButton;
        let menuButton;

    // Global Game Components
    let lives = 3;
    let livesText;
    let score = 0;
    let scoreText;


// Player and Interactibles Collision
function spikeDmg(player,spike) {
    this.damageSFX.play(this.sfxConfig);
    player.setX(50);
    player.setY(250);
    lives -=1;
    livesText.setText('Lives: ' + lives);
    if(lives <= 0) {
        this.bgm.stop();
        this.scene.start("OverScene", {score: score});
    }
}

function waterDmg(player,water) {
    this.damageSFX.play(this.sfxConfig);
    player.setX(50);
    player.setY(250);
    lives -=1;
    livesText.setText('Lives: ' + lives);
    if(lives <= 0) {
        this.bgm.stop();
        this.scene.start("OverScene", {score: score});
    }
}

function getDiamonds(player, diamond) {
    this.pickupSFX.play(this.sfxConfig);
    diamond.disableBody(true,true);
    score += 1;
    scoreText.setText('Diamonds Collected: ' + score + '\nScore: ' + (score*10));
}

function goal(player,flag) {
    this.bgm.stop();
    this.scene.start("WinScene", {score: score});
}



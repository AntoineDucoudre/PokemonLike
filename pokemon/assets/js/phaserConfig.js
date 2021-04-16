 // ***** CONFIGURATION ***** //
 const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    parent: "game-container",
    scene: [SceneOne, SceneTwo],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 } //topdown game, so no gravity
        }
    }
};
const game = new Phaser.Game(config);
let controls;
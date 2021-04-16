// if player is on x, y then random.randint(1, 5) --> if truc == 1 --> switch scenes get fight scenes


let seconds = 0;
let minutes = 0;
let hours = 0;

let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;



// Define var to hold setInterval() function
// let interval = null;

// Define var to hold stopwatch status
// let status = "stopped";

//Stopwatch function (logic to determine when to increment next value, etc.)
function Chronometer(){

    seconds++;

    //Logic to determine when to increment next value
    if(seconds / 60 === 1){
        seconds = 0;
        minutes++;

        if(minutes / 60 === 1){
            minutes = 0;
            hours++;
        }

    }

    // if only one digit, add 0 to the value
    if(seconds < 10){
        displaySeconds = "0" + seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }

    if(minutes < 10){
        displayMinutes = "0" + minutes.toString();
    }
    else{
        displayMinutes = minutes;
    }

    if(hours < 10){
        displayHours = "0" + hours.toString();
    }
    else{
        displayHours = hours;
    }

    //Display updated time values to user
    document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;

}

interval = window.setInterval(Chronometer, 1000);


const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  parent: "game-container",
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0} //top down game, so no gravity
    }
  }
};

const game = new Phaser.Game(config)
let controls;

function preload() {
  this.load.image("tiles", "../assets/img/pokemonWorld.png");
  this.load.tilemapTiledJSON("map", "../assets/MAP_POKEMON.json")
  this.load.spritesheet("player", "../assets/img/player.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
}

function create() {
  const map = this.make.tilemap({ key: "map" });

  // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name you used in preload)
  const tileset = map.addTilesetImage("pokemonWorld", "tiles");


  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
  const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
  const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);
  worldLayer.setCollisionByProperty({ collides : true});

  const spawnPoint = map.findObject(
    "Objects",
    (obj) => obj.name === "Spawn Point"
  );

  player = this.physics.add
    .sprite(spawnPoint.x, spawnPoint.y, "player")
    .setScale(0.6)
    .setSize(5, 10)
    .setOffset(1, 3);

  this.physics.add.collider(player, worldLayer);
  
  const anims = this.anims;
  anims.create({
    key: "misa-right",
    frames: anims.generateFrameNames("player", { start: 4, end: 4 }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "misa-left",
    frames: anims.generateFrameNames("player", { start: 8, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "misa-front",
    frames: anims.generateFrameNames("player", { start: 0, end: 0 }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "misa-back",
    frames: anims.generateFrameNames("player", { start: 12, end: 12 }),
    frameRate: 10,
    repeat: 0,
  });
  anims.create({
    key: "misa-right-walk",
    frames: anims.generateFrameNames("player", { start: 8, end: 11 }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "misa-left-walk",
    frames: anims.generateFrameNames("player", { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "misa-back-walk",
    frames: anims.generateFrameNames("player", { start: 12, end: 15 }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "misa-front-walk",
    frames: anims.generateFrameNames("player", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  const camera = this.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  cursors = this.input.keyboard.createCursorKeys();
    // const debugGraphics = this.add.graphics().setAlpha(0.5);
    // worldLayer.renderDebug(debugGraphics, {
    // tileColor: null, // Color of non-colliding tiles
    // collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    // faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });
}



function update() {

  const speed = 125;
  const prevVelocity = player.body.velocity.clone();

  player.body.setVelocity(0);

  //Horizontal movement
  if (cursors.left.isDown) {
    player.body.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(speed);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    player.body.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(speed);
  }

  // // Normalize and scale the velocity so that player can't move faster along a diagonal
  player.body.velocity.normalize().scale(speed);

  // Update the animation last and give left/right animations precedence over up/down animations
  if (cursors.left.isDown) {
    player.anims.play("misa-left-walk", true);
  } else if (cursors.right.isDown) {
    player.anims.play("misa-right-walk", true);
  } else if (cursors.up.isDown) {
    player.anims.play("misa-back-walk", true);
  } else if (cursors.down.isDown) {
    player.anims.play("misa-front-walk", true);
  } else {
    player.anims.stop();

    // // If we were moving, pick and idle frame to use
    if (prevVelocity.x < 0) player.anims.play("misa-right", true);
    else if (prevVelocity.x > 0) player.anims.play("misa-left", true);
    else if (prevVelocity.y < 0) player.anims.play("misa-back", true);
    else if (prevVelocity.y > 0) player.anims.play("misa-front", true);
  }
//
  //if(this.player.position.x > 37 && this.player.position.y < 35){
   // tempValue = 0;
  //  tempValue = Math.random(1, 5);
  //  if(tempValue === 3){

   // }
 // }//
}
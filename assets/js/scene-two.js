var SceneTwo = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, {"key": "SceneTwo"});
    },
    //init function() { },
    preload: function () {
       this.load.image("tiles2", "../assets/img/pokemonCenter.png");
       this.load.tilemapTiledJSON("map2", "../assets/POKEMON_CENTER.json");
       this.load.spritesheet("player", "../assets/img/player.png", {
            frameWidth: 64,
            frameHeight: 64,
       });
       this.load.spritesheet("nurse", "../assets/img/nurse.png", {
           frameWidth: 68,
           frameHeight: 72,
       })
       this.load.audio("pokemonCenterMusic", ["pokemonCenter.mp3"])
    },
    create: function () {
        const map = this.make.tilemap({ key: "map2" });



        const tileset = map.addTilesetImage("pokemonCenter", "tiles2");



        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);
        worldLayer.setCollisionByProperty({ collides: true });

        pokemonCenterMusic = this.sound.add("pokemonCenterMusic", { loop: true });

        pokemonCenterMusic.play();

        const spawnPoint = map.findObject(
            "Objects",
            (obj) => obj.name === "Spawn Point"
        );

        player = this.physics.add
            .sprite(spawnPoint.x, spawnPoint.y, "player")
            .setScale(0.7)
            .setSize(5, 10)
            .setOffset(1, 3);

        this.physics.add.collider(player, worldLayer);

        nurse = this.physics.add
            .sprite(720, 680,"nurse")
            .setScale(0.7)
            .setSize(5, 10)
            .setOffset(1, 3);





        const anims = this.anims;
        misaKeys = ["misa-right","misa-left","misa-front","misa-back","misa-right-walk","misa-left-walk","misa-back-walk","misa-front-walk"]
        starts = [4,8,0,12,8,4,12,0]
        ends = [4,8,0,12,11,7,15,3]
        for (let index = 0; index < misaKeys.length; index++) {
            anims.create({
                key: misaKeys[index],
                frames: anims.generateFrameNames("player", { start: starts[index], end: ends[index] }),
                frameRate: 10,
                repeat: -1,
            });
        }

        const camera = this.cameras.main;
        camera.startFollow(player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        cursors = this.input.keyboard.createCursorKeys();

    }, 
    update: function () {
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

        if(player.x > 690 && player.x < 735 && player.y > 1010 && player.y < 1040 && cursors.down.isDown){
            pokemonCenterMusic.stop();
            this.scene.stop('SceneTwo');
            this.scene.start('SceneOne');
        }
    }
});
var SceneFour = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { "key": "SceneFour" });
    },

    preload: function () {
        this.load.image("tiles3", "../assets/img/house.png")
        this.load.tilemapTiledJSON("map3", "../assets/HOUSE.json")
        this.load.spritesheet("player", "../assets/img/player.png", {
            frameWidth: 64,
            frameHeight: 64,
       });
       this.load.audio("houseMusic", ["house.mp3"]);
    },
    create: function () {
        const map = this.make.tilemap({ key: "map3"});

        const tileset = map.addTilesetImage("house", "tiles3");

        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);
        worldLayer.setCollisionByProperty({ collides: true });

        houseMusic = this.sound.add("houseMusic", { loop: true });
        houseMusic.play();

        const spawnPoint = map.findObject(
            "Objects",
            (obj) => obj.name === "Spawn Point"
        );


        player = this.physics.add
            .sprite(spawnPoint.x, spawnPoint.y, "player")
            .setScale(0.5)
            .setSize(5, 10)
            .setOffset(1, 3);


        this.physics.add.collider(player, worldLayer);

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
        if(player.x > 705 && player.x < 730 && player.y > 920 && player.y < 930 && cursors.down.isDown){
            houseMusic.stop();
            this.scene.stop('SceneFour');
            this.scene.start('SceneOne');
        }
    }

})
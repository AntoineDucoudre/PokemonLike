var SceneOne = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { "key": "SceneOne" });
    },
    //init: function () { },
    preload: function () {
        this.load.image("tiles", "../assets/img/pokemonWorld.png");
        this.load.tilemapTiledJSON("map", "../assets/MAP_POKEMON.json")
        this.load.spritesheet("player", "../assets/img/player.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.audio("roadMusic", ["road201.mp3"]);
        this.load.audio("pokemonEncounterMusic", ["pokemonEncounter.mp3"])
    },
    create: function () {
        const map = this.make.tilemap({ key: "map" });

        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const tileset = map.addTilesetImage("pokemonWorld", "tiles");


        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);
        worldLayer.setCollisionByProperty({ collides: true });


        roadMusic = this.sound.add("roadMusic", { loop: true });
        pokemonEncounterMusic = this.sound.add("pokemonEncounterMusic", { loop: false });

        roadMusic.play();

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

        this.pokemonEncounterChance = 995;
        this.enterKey = this.input.keyboard.addKey('ENTER');

        cursors = this.input.keyboard.createCursorKeys();


        // const debugGraphics = this.add.graphics().setAlpha(0.5);
        // worldLayer.renderDebug(debugGraphics, {
        // tileColor: null, // Color of non-colliding tiles
        // collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        // faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });

 
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
        
        // Enter in a building/house
        if(player.x > 755 && player.x < 770 && player.y > 455 && player.y < 470 && cursors.up.isDown){
            roadMusic.stop();
            this.scene.stop('SceneOne');
            this.scene.run('SceneTwo');
        }

        // Pokemon Fight
        if(player.x < 700 && player.x > 600 && player.y > 500 && player.y < 600){
            var isEncounter =  Math.random() * 1000;
             if(isEncounter > this.pokemonEncounterChance){
                roadMusic.stop();
                pokemonEncounterMusic.play();
                frame = parent.document.getElementById("frame");
                console.log(frame)
                alert("Fight !")
                frame.src = "poke.html"
             }
        }
        else if(player.x < 990 && player.x > 870 && player.y > 500 && player.y < 600){
            var isEncounter =  Math.random() * 1000;
             if(isEncounter > this.pokemonEncounterChance){
                roadMusic.stop();
                pokemonEncounterMusic.play();
                frame = parent.document.getElementById("frame");
                console.log(frame)
                alert("Fight !")
                frame.src = "poke.html"
             }
        }

        if (Phaser.Input.Keyboard.JustDown(this.enterKey) || this.isEnterPress) {
			this.scene.sleep('SceneOne');
            this.scene.run('SceneThree');
		}
    }
})
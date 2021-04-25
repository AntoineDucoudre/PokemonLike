var SceneThree = new Phaser.Class({
    Extends: Phaser.Scene,
     initialize: function () {
        Phaser.Scene.call(this, { "key": "SceneThree" });
    },
    preload: function () {
        this.load.image('button', '../assets/buttons/button_sprite_sheet.png')
    },

    create: function () {
        var sprite = this.add.sprite(400,300, 'button').setInteractive();

        sprite.on('pointerdown', function (pointer) {
            this.scene.stop('SceneThree');
            this.scene.run('SceneOne');
        });
    },
    
    update: function () {
    }
})
var SceneTwo = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, {"key": "SceneTwo"});
    },
    init: function (data) {
        this.message = data.message;
    },
    //TODO: Loading of HTML and get elements not good, check why and put them into the canvas
    preload: function () {
        this.load.htmlTexture('nameform', 'poke.html');
        var image;
    },
    create: function () {
        image = this.add.image(400,300, 'nameform').setOrigin(0);
    }, 
    update: function () {
        // this.time.addEvent({
        //     delay: 3000,
        //     loop: false,
        //     callback: () => {
        //         this.scene.stop("SceneTwo");
        //         this.scene.run("SceneOne", {
        //             "message" : "Came Back To Life"
        //         });
        //         alert("GG You WON !")
        //     }
        // })
    }
});
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
        this.load.html('nameform', 'poke.html');
    },
    create: function () {
        var text = this.add.text(
            640,
            360,
            this.message,
            {
                fontSize: 50,
                color: "#000000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
    },
    update: function () {

        this.time.addEvent({
            delay: 3000,
            loop: false,
            callback: () => {
                this.scene.stop("SceneTwo");
                this.scene.run("SceneOne", {
                    "message" : "Came Back To Life"
                });
                alert("Changement de scene")
            }
        })

    }
});
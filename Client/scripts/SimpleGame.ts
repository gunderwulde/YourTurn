/// <reference path="typings/phaser/phaser.d.ts"/>
/// <reference path='typings/firebase/firebase.d.ts'/>

class SimpleGame {

    game: Phaser.Game;
    firebase: Firebase;

    constructor() {
//        this.game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
        this.firebase = new Firebase("https://glaring-torch-9586.firebaseio.com");
        var dataRef = this.firebase.child("data");

        dataRef.set({ texto: "Hola Mundo" });

        dataRef.on("value", function (snapshot) {
            console.log(snapshot.val());
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        this.firebase.authWithOAuthPopup("facebook", function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
            }
        }, {
                remember: "sessionOnly",
                scope: "email,user_likes"
            });
    }

    

    preload() {
        this.game.load.image('logo', 'images/phaser2.png');


    }

    create() {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    }

}
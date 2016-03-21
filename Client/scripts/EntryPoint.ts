/// <reference path="typings/phaser/phaser.d.ts"/>
/// <reference path='typings/firebase/firebase.d.ts'/>
module YourTurn {
    export class EntryPoint extends Phaser.Game {
        firebase: Firebase;

        constructor() {
            super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null);
            //        this.game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
            this.firebase = new Firebase("https://glaring-torch-9586.firebaseio.com");
            var dataRef = this.firebase.child("data");

            dataRef.set({ texto: "Hola Mundo" });

            dataRef.on("value", function (snapshot) {
                console.log(snapshot.val());
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });

            this.firebase.authWithCustomToken("GHlim3fJZbq5NY5tkQPUYlqfMrc63b9Oq5WQTVKt", function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                }
            });


            /*
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
            */

            this.state.add("Boot", YourTurn.Boot, true);
            this.state.add("Game", YourTurn.Game);
        }
    }
}
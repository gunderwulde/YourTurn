/// <reference path="typings/phaser/phaser.d.ts"/>
/// <reference path='typings/firebase/firebase.d.ts'/>
module YourTurn {
    export class EntryPoint extends Phaser.Game {
        firebase: Firebase;
        constructor() {
            super(480, 800, Phaser.AUTO, 'content', { create: this.create });

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
            this.state.add("Boot", YourTurn.Boot);
            this.state.add("Game", YourTurn.Game);
        }

        create() {
            //  This sets a limit on the up-scale
            this.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
            this.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. 
            // You can disable that here:
            this.stage.disableVisibilityChange = true;
            this.state.start("Boot", true, false);
        }
    }
}
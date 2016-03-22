/// <reference path="typings/phaser/phaser.d.ts"/>
/// <reference path='typings/firebase/firebase.d.ts'/>
module YourTurn {
    export class EntryPoint extends Phaser.Game {
        constructor() {
            super(480, 800, Phaser.AUTO, 'content', { create: this.create });

            var ctrl = new FireBaseController();


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

            FireBaseController.Instance.facebookLogin(() => { this.state.start("Boot", true, false); } );
            
        }
    }
}
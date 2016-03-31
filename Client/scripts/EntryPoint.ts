module YourTurn {
    export class EntryPoint extends Phaser.Game {
        cordova: boolean;

        constructor() {
            this.cordova = typeof (<any>window).cordova !== 'undefined';
            super(720, 1280, Phaser.CANVAS, 'content', { preload: this.create });
            var ctrl = new FireBaseController();
            this.state.add("Boot", YourTurn.Boot);
            this.state.add("Game", YourTurn.Game);
        }

        create() {
            //  This sets a limit on the up-scale
            this.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
            this.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//            this.scale.aspectRatio = 720 / 1280;
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;

            FireBaseController.Instance.facebookLogin(() => {
                WSController.Start(); // Start call!
                this.state.start("Boot", true, false);
            }, () => {
                alert("Error!!");
            });
            /*
            if (this.cordova )
                FireBaseController.Instance.facebookLogin(() => { this.state.start("Boot", true, false); });
            else
                this.state.start("Boot", true, false);
            */
            
        }
    }
}
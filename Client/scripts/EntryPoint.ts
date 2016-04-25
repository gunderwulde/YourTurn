module YourTurn {
    export class EntryPoint extends Phaser.Game {
        cordova: boolean;

        constructor() {
            super(720, 1280, Phaser.CANVAS, 'content', {
                create: ()=>{
                    this.cordova = typeof (<any>window).cordova !== 'undefined';
                    //  This sets a limit on the up-scale


                    this.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
                    this.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
                    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                    this.scale.windowConstraints.bottom = "visual";
                    this.scale.pageAlignHorizontally = true;
        //            this.scale.aspectRatio = 720 / 1280;
                    this.input.maxPointers = 1;
                    this.stage.disableVisibilityChange = true;

                    var ctrl = new FireBaseController();
                    FireBaseController.Instance.facebookLogin(() => {                       
                        FireBaseController.Instance.subscribeToGameStart(() => { this.state.start("Boot", true, false); })
                        WSController.WannaPlay( FireBaseController.Instance.mySessionRef.key());
                    }, () => {
                        alert("Error on facebook login!!");
                    });
                    //this.state.start("Boot", true, false);
                }
            });

            this.state.add("Boot", YourTurn.Boot);
            this.state.add("Game", YourTurn.Game);
        }

        create() {
            
        }
    }
}
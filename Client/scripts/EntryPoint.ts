/*
  <allow-intent href="*.firebaseio.com" />
  <allow-intent href="auth.firebase.com" />
  <allow-intent href="script.google.com" />
  <allow-intent href="script.googleusercontent.com" />
*/



module YourTurn {
    export class EntryPoint extends Phaser.Game {
        cordova: boolean;

        constructor() {
            super(720, 1280, Phaser.CANVAS, 'content', {
                create: () => {
/*
var fbLoginSuccess = function (userData) {
  alert("UserInfo: "+ userData);
}

var w = <any>window;
var f =  <any>w.facebookConnectPlugin;
f.login(["public_profile"], fbLoginSuccess,
  function loginError (error) {
      alert("Error: "+ error);
  }
);
*/

                    this.cordova = typeof (<any>window).cordova !== 'undefined';
                    //  This sets a limit on the up-scale
                    if (this.cordova)
                        WSController.googleUrl = "https://script.google.com/macros/s/AKfycbwdL24yiQDx8fjphs9dZOe1naGA0B_AEf84uoAhYJ_VVXTQrcF8/exec";
                    this.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
                    this.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
                    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                    this.scale.windowConstraints.bottom = "visual";
                    this.scale.pageAlignHorizontally = true;
        //            this.scale.aspectRatio = 720 / 1280;
                    this.input.maxPointers = 1;
                    this.stage.disableVisibilityChange = true;
/*
                    var ctrl = new FireBaseController();
                    FireBaseController.Instance.facebookLogin(() => {
                        // Pone en modo Jugar.
                        FireBaseController.Instance.subscribeToGameStart(() => {
                            this.state.start("Boot", true, false);
                        })
                        WSController.WannaPlay( FireBaseController.Instance.mySessionRef.key());
                    }, () => {
                        alert("Error on facebook login!!");
                    });
*/
                    //this.state.start("Boot", true, false);
                }
            });

            this.state.add("Boot", YourTurn.Boot);
            this.state.add("Game", YourTurn.Game);
        }

    }
}
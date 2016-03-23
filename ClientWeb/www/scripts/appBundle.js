/// <reference path="../typings/phaser.d.ts"/>
/// <reference path='../typings/firebase.d.ts'/>
var YourTurn;
(function (YourTurn) {
    "use strict";
    window.onload = function () {
        var game = new YourTurn.EntryPoint();
    };
})(YourTurn || (YourTurn = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var YourTurn;
(function (YourTurn) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('logo', 'images/phaser2.png');
            this.load.spritesheet('numbers', 'images/sss.png', 64, 60, 64);
            //            this.load.image('profilepic', FireBaseController.Instance.userURL);
        };
        Boot.prototype.create = function () {
            //var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, align: "center", backgroundColor: "#ffff00" };
            //var text = this.game.add.text(0, 0, "Hola", style);
            //text.inputEnabled = true;
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'numbers', 0);
            logo.inputEnabled = true;
            logo.input.enableDrag();
            logo.anchor.setTo(0.5, 0.5);
        };
        return Boot;
    })(Phaser.State);
    YourTurn.Boot = Boot;
})(YourTurn || (YourTurn = {}));
var YourTurn;
(function (YourTurn) {
    var EntryPoint = (function (_super) {
        __extends(EntryPoint, _super);
        function EntryPoint() {
            this.cordova = typeof window.cordova !== 'undefined';
            _super.call(this, 720, 1280, Phaser.AUTO, 'content', { preload: this.create });
            var ctrl = new YourTurn.FireBaseController();
            this.state.add("Boot", YourTurn.Boot);
            this.state.add("Game", YourTurn.Game);
        }
        EntryPoint.prototype.create = function () {
            var _this = this;
            //  This sets a limit on the up-scale
            this.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
            this.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            if (this.cordova)
                YourTurn.FireBaseController.Instance.facebookLogin(function () { _this.state.start("Boot", true, false); });
            else
                this.state.start("Boot", true, false);
        };
        return EntryPoint;
    })(Phaser.Game);
    YourTurn.EntryPoint = EntryPoint;
})(YourTurn || (YourTurn = {}));
var YourTurn;
(function (YourTurn) {
    var FireBaseController = (function () {
        function FireBaseController() {
            FireBaseController.Instance = this;
            this.firebase = new Firebase("https://glaring-torch-9586.firebaseio.com/");
            this.readWriteTest();
        }
        FireBaseController.prototype.facebookLogin = function (onOk, onError) {
            var _this = this;
            if (onError === void 0) { onError = null; }
            this.firebase.authWithOAuthPopup("facebook", function (error, authData) {
                if (!error) {
                    _this.authData = authData;
                    _this.mySessionRef = _this.firebase.child("sessions").push();
                    _this.mySessionRef.onDisconnect().remove();
                    _this.mySessionRef.update({ userID: _this.authData.uid, userState: "OnLine" });
                    if (onOk != null)
                        onOk();
                }
                else {
                    console.log("Error " + error);
                    if (onError != null)
                        onError();
                }
            }, { remember: "sessionOnly", scope: "user_likes" });
        };
        FireBaseController.prototype.readWriteTest = function () {
            var test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            var dataRef = this.firebase.child("sessions");
            dataRef.set({ texto: "Hola Mundo", array: test });
            dataRef.on("value", function (snapshot) {
                console.log(snapshot.val());
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        };
        return FireBaseController;
    })();
    YourTurn.FireBaseController = FireBaseController;
})(YourTurn || (YourTurn = {}));
var YourTurn;
(function (YourTurn) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.apply(this, arguments);
        }
        Game.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Game.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
            }
            else {
            }
            this.game.state.start("Game", true, false);
        };
        return Game;
    })(Phaser.State);
    YourTurn.Game = Game;
})(YourTurn || (YourTurn = {}));
//# sourceMappingURL=appBundle.js.map
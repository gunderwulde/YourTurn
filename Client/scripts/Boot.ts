﻿
module YourTurn {
    export class Boot extends Phaser.State {

        preload() {


            this.load.image('logo', 'images/phaser2.png');
        }

        create() {
 
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
 
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;

            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
 //               this.stage.scale.pageAlignHorizontally = true;
            }
            else {
                //  Same goes for mobile settings.
            }
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
//            var logo = this.game.add.sprite(300, 400, 'logo');
            logo.anchor.setTo(0.5, 0.5);
//            this.game.state.start("Game", true, false);

        }

    }

}
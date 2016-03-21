
module YourTurn {
    export class Boot extends Phaser.State {
        preload() {
            this.load.image('logo', 'images/phaser2.png');
        }

        create() {
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
//            var logo = this.game.add.sprite(300, 400, 'logo');
            logo.anchor.setTo(0.5, 0.5);
//            this.game.state.start("Game", true, false);

        }

    }

}
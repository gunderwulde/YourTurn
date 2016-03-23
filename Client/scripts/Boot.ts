
module YourTurn {
    export class Boot extends Phaser.State {
        preload() {
            this.load.image('logo', 'images/phaser2.png');
            this.load.spritesheet('numbers', 'images/sss.png', 64, 60, 64);
//            this.load.image('profilepic', FireBaseController.Instance.userURL);
        }

        create() {
            //var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, align: "center", backgroundColor: "#ffff00" };
            //var text = this.game.add.text(0, 0, "Hola", style);
            //text.inputEnabled = true;
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'numbers', 0);
            logo.inputEnabled = true;
            logo.input.enableDrag();
            logo.anchor.setTo(0.5, 0.5);
        }
    }

}
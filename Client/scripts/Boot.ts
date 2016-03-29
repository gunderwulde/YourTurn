// 195 de aire por arriba. Calles 540 de alto 1280 - (195+540) = 545 para la zona de abajo.
// Ancho de calles 132(fichas de 126x90 )x5 = 660 (720 -> 60 ).

module YourTurn {
    export class Boot extends Phaser.State {
        preload() {
            this.load.image('card', 'images/card.png');
            this.load.spritesheet('numbers', 'images/numbers.png', 32, 29, 16*8);
//            this.load.image('profilepic', FireBaseController.Instance.userURL);
        }

        create() {
            //var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, align: "center", backgroundColor: "#ffff00" };
            //var text = this.game.add.text(0, 0, "Hola", style);
            //text.inputEnabled = true;

            for (var i = -1; i < 2; ++i) {

                var logo = new Card(this.game, "1", "+2", "-3");
                logo.x = this.game.world.centerX + i * 150;
                logo.y = this.game.world.centerY;

                logo = new Card(this.game, "2", "+3", "-4");
                logo.x = this.game.world.centerX + i * 150;
                logo.y = this.game.world.centerY - 120;

                logo = new Card(this.game, "7", "+6", "-5");
                logo.x = this.game.world.centerX + i * 150;
                logo.y = this.game.world.centerY + 120;

                logo = new Card(this.game, "2", "+3", "-4");
                logo.x = this.game.world.centerX + i * 150;
                logo.y = this.game.world.centerY - 240;

                logo = new Card(this.game, "7", "+6", "-5");
                logo.x = this.game.world.centerX + i * 150;
                logo.y = this.game.world.centerY + 240;

                logo = new Card(this.game, "2", "+3", "-4");
                logo.x = this.game.world.centerX + i * 150;
                logo.y = this.game.world.centerY - 360;

                logo = new Card(this.game, "7", "+6", "-5");
                logo.x = this.game.world.centerX + i * 150;
                logo.y = this.game.world.centerY + 360;
            }
            this.game.time.advancedTiming = true;
//            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'numbers', 0);
        }

        render() {            
            this.game.debug.text(this.game.time.fps.toString(), 2, 14, "#00ff00");
        }

    }

}
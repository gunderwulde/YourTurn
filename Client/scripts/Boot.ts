// 195 de aire por arriba. Calles 540 de alto 1280 - (195+540) = 545 para la zona de abajo.
// Ancho de calles 132(fichas de 126x90 )x5 = 660 (720 -> 60 ).

module YourTurn {
    export class Boot extends Phaser.State {
        preload() {
            this.load.image('card', 'images/card.png');
            this.load.spritesheet('numbers', 'images/numbers.png', 32, 29, 16 * 8);
        }

        table: Table;

        create() {
            this.game.time.advancedTiming = true;
            this.table = new Table("MATCHID", this.game);
        }


        update() {
            this.table.Update();
        }

        render() {            
            this.game.debug.text(this.game.time.fps.toString(), 2, 14, "#00ff00");
        }

    }

}
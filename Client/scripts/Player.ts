// 195 de aire por arriba. Calles 540 de alto 1280 - (195+540) = 545 para la zona de abajo.
// Ancho de calles 132(fichas de 126x90 )x5 = 660 (720 -> 60 ).

module YourTurn {
    export class Player{
        table: Table;

        // Lineas de juego.
        lines: Array<Line> = [];

        other: Player;

        handy: number;
        hand: Array<Card> = [];

        live: number = 20;
        mana: number = 1;

        constructor(table: Table, down: boolean) {
            this.table = table;
            if (down) this.handy = table.game.height * 0.8;
            else this.handy = table.game.height * 0.2;
            var y = table.game.height * 0.5 - (down ? 0 : 270);
            for (var i = 0; i < 5; ++i)
                this.lines.push(new Line(table.game, i, y, down));
        }

        PutCardOnHand(card: Card) {
            // Mira si sale de la mesa.
            // this.RemoveFrom(card.id, this.lines);
            this.hand.push(card);
            /// Mandar la carta a la mano.
            this.SortHand();
        }

        RemoveFromHand(id: number): Card {
            for (var i = 0; i < this.hand.length; ++i) {
                if (this.hand[i] != null && this.hand[i].id == id) {
                    return this.hand.splice(i, 1)[0];
                }
            }
            return null;
        }

        SortHand() {
            // 130 de ancho.
            var init = (this.table.game.width - (this.hand.length - 1) * Card.cardSize) * 0.5;
            for (var i = 0; i < this.hand.length; ++i) {
                this.hand[i].target.set( init, this.handy );
                init += Card.cardSize;
            }
        }

        PutCardOnTable(card: Card, line: number, order: number) {
            this.lines[line].SetCard(card,order);
        }

        Turn() {
            for (var i = 0; i < this.hand.length; ++i)
                if ( this.hand[i].mana <= this.mana)
                    this.hand[i].SetActive(true);

        }

    
    }

}
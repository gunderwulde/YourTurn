// 195 de aire por arriba. Calles 540 de alto 1280 - (195+540) = 545 para la zona de abajo.
// Ancho de calles 132(fichas de 126x90 )x5 = 660 (720 -> 60 ).

module YourTurn {
    export class Player{

        other: Player;

        hand: Array<Card> = [];
        table: Table;
        lines: Array<Card>;
        constructor(table: Table) {
            this.table = table;
            this.lines = [null, null, null, null, null];
        }

        PutCardOnHand(card: Card) {
            // Mira si sale de la mesa.
            this.RemoveFrom(card.id, this.lines);
            this.hand.push(card);
        }

        PutCardOnTable(card: Card, line: number): boolean {
            // Mira si sale de la mano.
            this.RemoveFrom(card.id, this.hand);

            if (this.lines[line] != null) return false;
            this.lines[line] = card;

            return true;
        }

        RemoveFrom(id: number, array: Array<Card>) {
            for (var i = 0; i < array.length; ++i) {
                if (array[i]!=null && array[i].id == id) {
                    array.splice(id, 1);
                    return;
                }
            }
        }
    
    }

}
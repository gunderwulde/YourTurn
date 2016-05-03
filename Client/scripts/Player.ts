// 195 de aire por arriba. Calles 540 de alto 1280 - (195+540) = 545 para la zona de abajo.
// Ancho de calles 132(fichas de 126x90 )x5 = 660 (720 -> 60 ).

module YourTurn {
    export class Player {
        table: Table;

        // Lineas de juego.
        lines: Array<Line> = [];

        other: Player;

        handy: number;
        hand: Array<Card> = [];

        health: number = 0;
        mana: number = 0;

        textHealth: Phaser.Text;
        textMana: Phaser.Text;

        constructor(table: Table, down: boolean) {
            this.table = table;
            if (down) {
                // Mana
                this.textMana = this.table.game.add.text(this.table.game.world.width - 48, this.table.game.world.height - 144, "0", { font: "64px Arial", fill: "#88f" });
                this.textHealth = this.table.game.add.text(this.table.game.world.width - 48, this.table.game.world.height - 48, "0", { font: "64px Arial", fill: "#f44" });
            } else {
                this.textMana = this.table.game.add.text(48, 144, "0", { font: "64px Arial", fill: "#88f" });
                this.textHealth = this.table.game.add.text(48, 48, "0", { font: "64px Arial", fill: "#f44" });
            }
            this.textMana.anchor.setTo(0.5, 0.5);
            this.textHealth.anchor.setTo(0.5, 0.5);

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

        RemoveFromHand(uid: number): Card {
            for (var i = 0; i < this.hand.length; ++i) {
                if (this.hand[i] != null && this.hand[i].uid == uid) {
                    return this.hand.splice(i, 1)[0];
                }
            }
            return null;
        }

        SortHand() {
            // 130 de ancho.
            var init = (this.table.game.width - (this.hand.length - 1) * Card.cardSize) * 0.5;
            for (var i = 0; i < this.hand.length; ++i) {
                this.hand[i].target.set(init, this.handy);
                init += Card.cardSize;
            }
        }

        PutCardOnTable(card: Card, line: number, order: number) {
            this.lines[line].SetCard(card, order);
        }

        GetCardByUID(uid: number) {
            for (var line of this.lines) {
                var ret = line.GetCardByUID(uid);
                if (ret != null)
                    return ret;
            }
            return null;
        }

        Turn() {
            for (var i = 0; i < this.hand.length; ++i)
                // if (this.hand[i].mana <= this.mana)
                    this.hand[i].SetActive(true);

        }

        SetMana(value) {
            if (this.mana != value) {
                this.mana = value;
                this.textMana.text = this.mana.toString();
            }
        }

        SetHealth(value) {
            if (this.health != value) {
                this.health = value;
                this.textHealth.text = this.health.toString();
            }
        }
    }

}
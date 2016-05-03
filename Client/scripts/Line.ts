// 126x90

module YourTurn {
    export class Line extends Phaser.Sprite {
        cards: Array<Card> = [];
        slots: Array<number>;
        static current: Line;

        id: number;
        rect: Phaser.Rectangle;
        dropable: boolean;

        static Preload(state: Phaser.State) {
            state.load.image('line', 'images/line.png');
        }

        constructor(game: Phaser.Game, x: number, y: number, dropable: boolean) {
            super(game, dropable ? 35 + x * 130: 555 - x * 130, y, 'line');
            this.rect = new Phaser.Rectangle(this.x, this.y, this.width, this.height); 

            if (dropable) // Is the lower one.
                this.slots = [this.y + this.height - 50, this.y + this.height - 95 - 50];
            else
                this.slots = [this.y + 50, this.y + 95 + 50];

            this.id = x;
            this.alpha = 0.3;
            this.dropable = dropable;
            // Create slots to set the cards.
            game.add.existing(this);
        }

        update() {
            super.update();
            if (!this.dropable || Card.current == null) {
                /*
                if (Line.current == this) {
                    this.alpha = 0.3;
                    Line.current = null;
                }
                */
                return;
            }

            if (Phaser.Rectangle.containsPoint(this.rect, this.game.input.mousePointer.position)) {
                this.alpha = 1;
                Line.current = this;
            }
            else {                
                this.alpha = 0.3;
                if (Line.current == this)
                    Line.current = null;
            }
        }

        SetCard(card: Card, order: number): boolean {
            card.SetActive(false);
            if (this.cards.length >= 2) return false;
            if (order == 0) {
                if (this.cards.length == 1) this.cards[0].target.set(this.x + 65, this.slots[order + 1]);
                this.cards.unshift(card);
            }
            else this.cards.push(card);
            card.target.set(this.x + 65, this.slots[order]);
        }

        GetCardByUID(uid: number): Card {
            for (var v of this.cards)
                if (v.uid == uid)
                    return v;
            return null;
        }
    }
}
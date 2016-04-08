// 126x90

module YourTurn {
    export class Line extends Phaser.Sprite {
        cards: Array<Card> = [null, null];
        static current: Line;

        id: number;
        rect: Phaser.Rectangle;
        dropable: boolean;

        static Preload(state: Phaser.State) {
            state.load.image('line', 'images/line.png');
        }

        constructor(game: Phaser.Game, x: number, y: number, dropable: boolean) {
            super(game, 35 + x * 130, y, 'line');
            this.rect = new Phaser.Rectangle(this.x, this.y, this.width, this.height); 
            this.id = x;
            this.alpha = 0.3;
            this.dropable = dropable;
            game.add.existing(this);
        }

        update() {
            super.update();
            if (!this.dropable || Card.current == null ) return;

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

        SetCard(card: Card): boolean {
            var order = 0;
            if (this.cards.length >= 2) return false;
            if (order == 0) this.cards.unshift(card)
            else this.cards.push(card);
        }

        Sort() {
            // 130 de ancho.
            /*
            var init = (this.table.game.width - (this.hand.length - 1) * Card.cardSize) * 0.5;
            for (var i = 0; i < this.hand.length; ++i) {
                this.hand[i].target.set(init, this.handy);
                init += Card.cardSize;
            }
            */
        }

    }
}
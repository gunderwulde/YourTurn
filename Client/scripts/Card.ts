// 126x90

module YourTurn {
    class Target {
        home: boolean = true;
        x: number;
        y: number;

        set(x: number, y: number) {
            this.x = x;
            this.y = y;
            this.home = false;
        }

        go() {
            this.home = false;
        }

        update(card: Card ) {
            if (this.home) return;
            var difx = this.x - card.x;
            var dify = this.y - card.y;
            var dif = difx * difx + dify * dify;
            if (dif <= 1) {
                this.home = true;
                card.x = this.x;
                card.y = this.y;
            } else {
                card.x += difx * 0.3;
                card.y += dify * 0.3;
            }
        }
    }


    export class Card extends Phaser.Sprite {
        static cardSize: number = 130;
        static current: Card;

        id: number;

        mana: number;
        attack: string;
        life: string;

        sprMana: Phaser.Sprite;
        sprAttack: Phaser.Sprite;
        sprLife: Phaser.Sprite;
        target: Target = new Target();

        static Preload(state: Phaser.State) {
            state.load.image('card', 'images/card.png');
            state.load.spritesheet('numbers', 'images/numbers.png', 32, 29, 16 * 8);
        }

        constructor(game: Phaser.Game, id: string) {
            super(game, 0, 0, 'card');
            this.anchor.setTo(0.5, 0.5);
            this.id = Number(id);
            this.events.onDragStart.add(() => { Card.current = this; }, this);
            this.events.onDragStop.add(() => {

                Card.current.target.go();

                if (Line.current != null) { // mandar jugada!!!!                    
                    WSController.Play(Card.current.id, Line.current.id, 0);
                    //Table.instance.player1.PutCardOnTable(Card.current, Line.current.id, 0);
                }
                Card.current = null;
            }, this);
            game.add.existing(this);
        }

        Show(mana: string = "", attack: string = "", life: string = "") { 
            if (mana != "") {
                this.mana = Number( mana );
                this.sprMana = new Phaser.Sprite(this.game, 47, -35, 'numbers', 64 + this.GetSprite(mana));
                this.sprMana.anchor.setTo(0.5, 0.5);
                this.addChild(this.sprMana);
            }
            if (attack != "") {
                this.attack = attack;
                this.sprAttack = new Phaser.Sprite(this.game, 15, 35, 'numbers', this.GetSprite(attack));
                this.sprAttack.anchor.setTo(0.5, 0.5);
                this.addChild(this.sprAttack);
            }
            if (life != "") {
                this.life = life;
                this.sprLife = new Phaser.Sprite(this.game, 47, 35, 'numbers', 32 + this.GetSprite(life));
                this.sprLife.anchor.setTo(0.5, 0.5);
                this.addChild(this.sprLife);
            }
        }

        update() {            
            super.update();
            this.target.update(this);
        }

        GetSprite(val: string): number {
            var num = 0;
            if (val[0] == "+") num += Number( val[1] );
            else
                if (val[0] == "-") num += 10 + Number(val[1]);
                else num += 19 + Number(val[0]);

            return num;
        }

        SetActive(value: boolean) {
            this.inputEnabled = true;
            if (value) this.input.enableDrag();
            else this.input.disableDrag();
        }
    }
}
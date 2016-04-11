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
        static response: Card;

        point : Phaser.Point;

        id: number;

        mana: number;
        attack: string;
        life: string;
        active: boolean;

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
            this.events.onDragStart.add( () => {
                Card.current = this;
            }, this);
            this.events.onDragStop.add(() => {
                if (Line.current != null) {
                    Card.response = Card.current;
                    this.point = new Phaser.Point(Card.response.x, Card.response.y);
                    WSController.Play(Card.response.id, Line.current.id, 0);
                } else
                    Card.current.target.go();
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
            if (this == Card.response) {
                this.WaitingResponse();
            } 

            if (this.active) {
                if (Card.response != null && this.inputEnabled) {
                    this.input.disableDrag();
                    this.inputEnabled = false;
                }
                else
                    if (Card.response == null && !this.inputEnabled) {
                        this.inputEnabled = true;
                        this.input.enableDrag();
                    }
            }

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

        SetActive(value: boolean) { this.active = value; }
        WaitingResponse() {
            var ang = this.game.time.time / 250.0;
            var sd = 32;
            var ca = Math.cos(ang) * sd;
            var sa = Math.sin(ang) * sd;
            this.x += (this.point.x + ca - sa - this.x) * 0.1;
            this.y += (this.point.y + sa + ca - this.y) * 0.1;
        }
    }
}
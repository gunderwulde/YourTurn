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

        point: Phaser.Point;
        player: Player;

        uid: number;
        id: number;

        mana: number;
        attack: string;
        myHealth: string;
        active: boolean;

        sprMana: Phaser.Sprite;
        sprAttack: Phaser.Sprite;
        sprHealth: Phaser.Sprite;
        target: Target = new Target();

        static Preload(state: Phaser.State) {
            state.load.image('card', 'images/card.png');
            state.load.spritesheet('numbers', 'images/numbers.png', 32, 29, 16 * 8);
        }

        constructor(player: Player, uid: string) {
            super(player.table.game, 0, 0, 'card');
            this.anchor.setTo(0.5, 0.5);
            this.uid = Number(uid);
            this.player = player;
            this.events.onDragStart.add(() => {
                if (this.mana <= this.player.mana)
                    this.input.draggable = true;
                else
                    this.input.draggable = false;
                Card.current = this;
            }, this);
            this.events.onDragStop.add(() => {
                if (Line.current != null) {
                    Card.response = Card.current;
                    this.point = new Phaser.Point(Card.response.x, Card.response.y);
                    WSController.Play(Card.response.uid, Line.current.id, 0);
                } else
                    Card.current.target.go();
                Card.current = null;
                    
            }, this);
            player.table.game.add.existing(this);
        }

        Show(id: string = "", mana: string = "", health: string = "", attack: string = "") { 
            if (id != "") {
                this.id = Number(id);
                // Poner imagen
            }
            if (mana != "") {
                this.mana = Number( mana );
                this.sprMana = new Phaser.Sprite(this.game, 47, -35, 'numbers', 64 + this.GetSprite(mana));
                this.sprMana.anchor.setTo(0.5, 0.5);
                this.addChild(this.sprMana);
            }
            if (attack != "" && this.attack != attack) {
                console.log("Modify Attack from " + this.attack + " to " + attack)
                this.attack = attack;
                if (this.sprAttack != null) this.sprAttack.kill();
                this.sprAttack = new Phaser.Sprite(this.game, 15, 35, 'numbers', this.GetSprite(attack));
                this.sprAttack.anchor.setTo(0.5, 0.5);
                this.addChild(this.sprAttack);
            }
            if (health != "" && this.myHealth != health) {
                console.log("Modify Health from " + this.myHealth + " to " + health)
                this.myHealth = health;
                if (this.sprHealth != null) this.sprHealth.kill();
                this.sprHealth = new Phaser.Sprite(this.game, 47, 35, 'numbers', 32 + this.GetSprite(health));
                this.sprHealth.anchor.setTo(0.5, 0.5);
                this.addChild(this.sprHealth);
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

            return num-1;
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
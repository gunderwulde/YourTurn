// 126x90

module YourTurn {
    export class Card extends Phaser.Sprite {

        id: number;
        mana: Phaser.Sprite;
        attack: Phaser.Sprite;
        life: Phaser.Sprite;

        constructor(game: Phaser.Game, id: string) {
            super(game, 0, 0, 'card');
            this.inputEnabled = true;
            this.input.enableDrag();
            this.anchor.setTo(0.5, 0.5);
            this.id = Number(id);

            game.add.existing(this);
        }

        Show(mana: string = "", attack: string = "", life: string = "") { 
            if (mana != "") {
                this.mana = new Phaser.Sprite(this.game, 47, -35, 'numbers', 64 + this.getSprite(mana));
                this.mana.anchor.setTo(0.5, 0.5);
                this.addChild(this.mana);
            }
            if (attack != "") {
                this.attack = new Phaser.Sprite(this.game, 15, 35, 'numbers', this.getSprite(attack));
                this.attack.anchor.setTo(0.5, 0.5);
                this.addChild(this.attack);
            }
            if (life != "") {
                this.life = new Phaser.Sprite(this.game, 47, 35, 'numbers', 32 + this.getSprite(life));
                this.life.anchor.setTo(0.5, 0.5);
                this.addChild(this.life);
            }
        }

        getSprite(val: string): number {
            var num = 0;
            if (val[0] == "+") num += Number( val[1] );
            else
                if (val[0] == "-") num += 10 + Number(val[1]);
                else num += 19 + Number(val[0]);

            return num;
        }
    }
}
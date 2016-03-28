// 126x90

module YourTurn {
    export class Card extends Phaser.Sprite {
        mana: Phaser.Sprite;
        attack: Phaser.Sprite;
        life: Phaser.Sprite;

        constructor(game: Phaser.Game, _mana: string, _attack: string, _life: string) {
            super(game, 0, 0, 'card');
            this.inputEnabled = true;
            this.input.enableDrag();
            this.anchor.setTo(0.5, 0.5);

            this.mana = new Phaser.Sprite(game, 47, -35, 'numbers', 64 + this.getSprite(_mana) );
            this.mana.anchor.setTo(0.5, 0.5);
            this.addChild(this.mana);

            this.attack = new Phaser.Sprite(game, 15, 35, 'numbers', this.getSprite(_attack));
            this.attack.anchor.setTo(0.5, 0.5);
            this.addChild(this.attack);

            this.life = new Phaser.Sprite(game, 47, 35, 'numbers', 32 + this.getSprite(_life));
            this.life.anchor.setTo(0.5, 0.5);
            this.addChild(this.life);

            game.add.existing(this);
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
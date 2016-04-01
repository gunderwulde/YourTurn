// 195 de aire por arriba. Calles 540 de alto 1280 - (195+540) = 545 para la zona de abajo.
// Ancho de calles 132(fichas de 126x90 )x5 = 660 (720 -> 60 ).

module YourTurn {
    class Action {
        time: number;
        action: string;
        constructor(time: number, action: string) {
            this.time = time;
            this.action = action;
        }
    }

    export class Boot extends Phaser.State {
        actions: Array<Action> = [];
        preload() {
            this.load.image('card', 'images/card.png');
            this.load.spritesheet('numbers', 'images/numbers.png', 32, 29, 16 * 8);
//            this.load.image('profilepic', FireBaseController.Instance.userURL);
        }
        
        onAction(action: string) {
            console.log(">>> action " + action);
            var logo = new Card(this.game, "1", "+2", "-3");
            this.game.add.tween(logo).to({ x: this.game.world.centerX, y: this.game.world.centerY }, 500, Phaser.Easing.Linear.None, true);
        }
    
        create() {
            FireBaseController.Instance.subscribeToActions("MATCHID", (time: number, action: string) => {
                this.actions.push(new Action(time*100 + this.game.time.now, action) );
            });
            this.game.time.advancedTiming = true;
//            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'numbers', 0);
        }


        update() {
            if (this.actions.length > 0) {
                if (this.game.time.now > this.actions[0].time ) {
                    this.onAction(this.actions.shift().action);
                }
            }
        }

        render() {            
            this.game.debug.text(this.game.time.fps.toString(), 2, 14, "#00ff00");
        }

    }

}
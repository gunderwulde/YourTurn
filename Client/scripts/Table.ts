// 195 de aire por arriba. Calles 540 de alto 1280 - (195+540) = 545 para la zona de abajo.
// Ancho de calles 132(fichas de 126x90 )x5 = 660 (720 -> 60 ).

module YourTurn {
    export class Table{
        static instance: Table;

        game: Phaser.Game;
        actions: Actions;
        myID: string = "P1";
        lastAction: number = 0;

        player1: Player;
        player2: Player;
        matchID: string;

        button: Phaser.Button;

        constructor(game: Phaser.Game) {
            Table.instance = this;
            this.game = game;
            this.actions = new Actions(this);

            this.button = this.game.add.button(this.game.world.centerX - 95, this.game.world.height - 100, 'button', this.ActionOnClick, this, 2, 1, 0);
            this.button.visible = false;

            this.player1 = new Player(this, true);
            this.player2 = new Player(this, false);

            this.player1.other = this.player2;
            this.player2.other = this.player1;
            this.lastAction = 0;
        }

        ActionOnClick() {
            this.button.visible = false;
            WSController.EndTurn();
        }

        SubscribeToActions() {
            FireBaseController.Instance.subscribeToActions( (time: number, action: string) => {
                console.log("ACT!" + time + " >>>> " + action );
                this.actions.Push(time * 100 + this.game.time.now, action);
            });
        }

        Update() {
            this.actions.Update();
        }
    }

}
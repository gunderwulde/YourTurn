// 195 de aire por arriba. Calles 540 de alto 1280 - (195+540) = 545 para la zona de abajo.
// Ancho de calles 132(fichas de 126x90 )x5 = 660 (720 -> 60 ).

module YourTurn {
    export class Table{
        static myID: string = "P1";
 
        static instance: Table;

        game: Phaser.Game;
        actions: Actions;

        player1: Player;
        player2: Player;

        constructor(matchid: string, game: Phaser.Game) {
            Table.instance = this;
            this.game = game;
            this.actions = new Actions(this);

            this.player1 = new Player(this, true);
            this.player2 = new Player(this, false);

            this.player1.other = this.player2;
            this.player2.other = this.player1;

            FireBaseController.Instance.subscribeToActions(matchid, (time: number, action: string) => {
                this.actions.Push(time * 100 + this.game.time.now, action);
            });
        }

        Update() {
            this.actions.Update();
        }
    }

}
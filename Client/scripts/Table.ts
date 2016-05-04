// 195 de aire por arriba. Calles 540 de alto 1280 - (195+540) = 545 para la zona de abajo.
// Ancho de calles 132(fichas de 126x90 )x5 = 660 (720 -> 60 ).

module YourTurn {
    export class Table{
        static instance: Table;

        game: Phaser.Game;
        actions: Actions;
        myID: string = "P1";

        player1: Player;
        player2: Player;
        matchID: string;

        button: Phaser.Button;
        isTurn: boolean;
        isWaiting: boolean;
        alphaOff: number = 0.2;

        constructor(game: Phaser.Game) {
            this.game = game;
            Table.instance = this;
            this.actions = new Actions(this);

            this.button = this.game.add.button(this.game.world.centerX - 95, this.game.world.height - 100, 'button', this.OnEndTurn, this, 2, 1, 0);

            this.player1 = new Player(this, true);
            this.player2 = new Player(this, false);

            this.player1.other = this.player2;
            this.player2.other = this.player1;

            this.isTurn = false;
            this.isWaiting = false;
            this.button.alpha = this.alphaOff;
            this.button.inputEnabled = false;
        }

        SubscribeToActions() {
            FireBaseController.Instance.subscribeToActions( (time: number, action: string) => {
                //console.log("ACT!" + time + " >>>> " + action );
                this.actions.Push(time * 100 + this.game.time.now, action);
            });
        }

        Update() {
            this.actions.Update();
        }

        MyPlayer(): Player { return this.myID == "P1" ? this.player1 : this.player2 }

        OnStartTurn() {
            this.isTurn = true;
            this.isWaiting = false;
            this.button.alpha = 1;
            this.button.inputEnabled = true;
        }

        OnEndTurn() {
            this.isTurn = false;
            this.isWaiting = false;
            this.button.alpha = this.alphaOff;
            this.button.inputEnabled = false;
            WSController.EndTurn();
        }

        OnPlayedCard() {
            if (this.isWaiting) {
                Card.response = null;
                this.isWaiting = false;
                this.isTurn = true;
                this.button.alpha = 1;
                this.button.inputEnabled = true;
            }
        }

        OnPlayCard(uid: number, line: number, slot: number) {
            this.isTurn = false;
            this.isWaiting = true;
            this.button.alpha = this.alphaOff;
            this.button.inputEnabled = false;
            Card.response = Card.current;
            WSController.Play(uid, line, slot);
        }
    }

}
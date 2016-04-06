// 195 de aire por arriba. Calles 540 de alto 1280 - (195+540) = 545 para la zona de abajo.
// Ancho de calles 132(fichas de 126x90 )x5 = 660 (720 -> 60 ).

module YourTurn {
    class RawAction {
        time: number;
        action: string;
        constructor(time: number, action: string) {
            this.time = time;
            this.action = action;
        }
    }

    export class Actions{
        table: Table;
        rawActions: Array<RawAction> = [];
        constructor(table: Table) { this.table = table; }

        Push(time: number, action: string) { this.rawActions.push(new RawAction(time, action)); }
        Update() {
            if (this.rawActions.length > 0) {
                if (this.table.game.time.now > this.rawActions[0].time) {
                    this.Process(this.rawActions.shift().action);
                }
            }
        }

        Process(action: string) {
            var params = action.split(':');
            var player = params[0] == "P1" ? this.table.player1 : this.table.player2;
            switch (params[1]) {
                case "DRW": this.DrawAction(params, player); break;
                default: console.log(">>> action " + params[0] + " " + params[1]); break;
            }
        }

        //P1:DRW:12:1:1:1
        DrawAction(params: Array<string>, player: Player) {
            var card: Card = new Card(this.table.game, params[2]);
            player.PutCardOnHand(card);
            if (params.length>3)
                card.Show(params[3], params[4], params[5]);            
        }
    }
}
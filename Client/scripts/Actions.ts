﻿// 195 de aire por arriba. Calles 540 de alto 1280 - (195+540) = 545 para la zona de abajo.
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
            var player = params[0] == Table.myID ? this.table.player1 : this.table.player2;
            switch (params[1]) {
                case "DRW": this.DrawAction(player, params); break;
                case "TRN": this.Turn(player); break;
                case "PLY": this.Play(player, params); break;
                default: console.log(">>> action " + params[0] + " " + params[1]); break;
            }
        }

        //P1:DRW:12:1:1:1
        DrawAction(player: Player, params: Array<string>) {
            var card: Card = new Card(this.table.game, params[2]);
            card.x = this.table.game.width + 130;
            card.y = player.handy;
            player.PutCardOnHand(card);
            if (params.length > 3) card.Show(params[3], params[4], params[5]);
        }

        //P1:TRN
        Turn(player: Player) {
            // Give turn to player.
            player.Turn();
        }

        //P1:PLY:12:0:0:1:1:1
        Play(player: Player, params: Array<string>) {
            console.log(">>> Play " );
            // Play card.
            var player = params[0] == Table.myID ? this.table.player1 : this.table.player2;
            var card = player.RemoveFromHand(Number(params[2]));
            // If there are data for the card, set it.
            if (params.length > 5) card.Show(params[5], params[6], params[7]);
            // Send card to line params[3], slot params[4]
            player.PutCardOnTable(card, Number(params[3]), Number(params[4]));            
        }
    }
}
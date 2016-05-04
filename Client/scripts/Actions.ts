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
            var player = params[0] == this.table.myID ? this.table.player1 : this.table.player2;
            switch (params[1]) {
                case "UID": this.table.myID = params[0]; break;
                case "DRW": this.DrawAction(player, params); break;
                case "TRN": this.Turn(player); break;
                case "PLY": this.Play(player, params); break;
                case "INF": this.Info(player, params); break;
                case "ATK": this.Attack(player, params); break;
                case "DMG": this.Damage(player, params); break;
                case "KIL": this.Kill(player, params); break;

                default: console.log(">>> action " + params[0] + " " + params[1]); break;
            }
        }

        //P1:DRW:UID[:ID:MANA:HEALTH:ATTACK]
        DrawAction(player: Player, params: Array<string>) {
            var card: Card = new Card(player, params[2]);
            card.x = this.table.game.width + 130;
            card.y = player.handy;
            player.PutCardOnHand(card);
            if (params.length > 3) card.Show(params[3], params[4], params[5], params[6]);
        }

        //P1:TRN
        Turn(player: Player) {
            // Give turn to player.
            player.table.OnStartTurn();
            player.Turn();
        }

        //P1:PLY:UID:LINE:SLOT[:ID:MANA:HEALTH:ATTACK]
        Play(player: Player, params: Array<string>) {            
            player.table.OnPlayedCard();
            // Play card.
            // var player = params[0] == this.table.myID ? this.table.player1 : this.table.player2;
            var card = player.RemoveFromHand(Number(params[2]));
            // If there are data for the card, set it.
            if (params.length > 5) card.Show(params[5], params[6], params[7], params[8]);
            // Send card to line params[3], slot params[4]
            player.PutCardOnTable(card, Number(params[3]), Number(params[4]));
        }
        //P1:INF:MANA:HEALTH
        Info(player: Player, params: Array<string>) {
            player.SetHealth( Number(params[3]) );
            player.SetMana( Number(params[2]) );
        }
        //P1:ATK:UID
        Attack(player: Player, params: Array<string>) {
            var card = player.GetCardByUID(Number(params[2]));
            if (card != null) {
                console.log(">>> ATTACK!!! ");
            } else {
                console.log(">>> ERROR EN ATTACK!!! ");
            }
        }
        //P1:DMG:UID[:HEALTH:ATTACK]
        Damage(player: Player, params: Array<string>) {
            var card = player.GetCardByUID(Number(params[2]));
            if (card != null) card.Show("", "", params[3], params[4]);
        }
        //P1:KIL:UID
        Kill(player: Player, params: Array<string>) {
            var card = player.GetCardByUID(Number(params[2]));
            if (card != null) card.kill();
            else console.log(">>> ERROR EN DEF!!! ");

        }
    }
}
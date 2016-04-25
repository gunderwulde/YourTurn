
module YourTurn {
    export class WSController {
        static url: string = "http://13.95.148.159/";
        static Start() {
            $.ajax({ url: WSController.url + "barajar.php?uid=" + FireBaseController.Instance.authData.uid, type: "GET", dataType: 'jsonp', contentType: "application/json" })
                .done((data, status) =>  {
                    console.log(">>> " + data.status);
                })
                .fail(() => { });
        }

        static CreateMatch(OnOk, OnError=null) {
            $.ajax({
                url: WSController.url + "crear_partida.php?uid1=" + FireBaseController.Instance.authData.uid + "&uid2=PY2",
                type: "GET", dataType: 'jsonp', contentType: "application/json"
            }).done((data, status) => {
                FireBaseController.Instance.matchID = data.matchID;
                if (OnOk != null) OnOk();
                }).fail(() => {
                    if (OnError != null) OnError();
                });
            
        }


        static Jugada(time: number, value: string) {
            console.log(">>>> Add jugada " + FireBaseController.Instance.matchID);
            $.ajax({
                url: WSController.url + "jugada.php?token=" + FireBaseController.Instance.authData.uid + "&match=" + FireBaseController.Instance.matchID + "&k=" + time + "&v=" + value,
                type: "GET", dataType: 'jsonp', contentType: "application/json"
            }).done((data, status) => {
                console.log(">>> " + data);
            }).fail(() => { });
        }

        static Play(cardid: number, line: number, slot: number) {
        }

        static EndTurn() {
        }


        static googleUrl: string = "https://script.google.com/macros/s/AKfycbyffbjkSf-Zee8LY6vwVaUkc5Ifts7Tuqmh5LWo5mRY/dev";

        static WannaPlay(session:string) {
            $.ajax({
                url: WSController.googleUrl,
                type: "GET",
                data: { command: "wplay", session: session },
                dataType: 'jsonp',
                crossDomain: true,
                contentType: "application/json"
            }).done((data, status) => {
                console.log(">>> DONE " + status + " " + data.res);
            }).fail((data) => {
                console.log(">>> FAIL " + data.res );
            });
            
        }
    }
}
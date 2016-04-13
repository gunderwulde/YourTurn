
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

        static CreateMatch() {
            $.ajax({
                url: WSController.url + "crear_partida.php?uid1=" + FireBaseController.Instance.authData.uid + "&uid2=PY2",
                type: "GET", dataType: 'jsonp', contentType: "application/json"
            }).done((data, status) => {
                console.log(">>> " + data.name);
            }).fail(() => { });
            
        }

        static Play(cardid:number, line:number, slot:number) {
        }

        static EndTurn() {
        }
    }
}
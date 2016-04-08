
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

        static Play(cardid:number, line:number, slot:number) {
        }

        static EndTurn() {
        }
    }
}

module YourTurn {
    export class WSController {

        static Start() {
            $.ajax({ url: "http://13.95.148.159/barajar.php?uid=" + FireBaseController.Instance.authData.uid, type: "GET", dataType: 'jsonp', contentType: "application/json" })
                .done((data, status) => {
                    console.log(">>> " + data.status);
                })
                .fail(() => { });
        }

        static Play(cardid:number, slot:number) {
        }

        static EndTrun() {
        }
    }
}
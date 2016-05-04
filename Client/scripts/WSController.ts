
module YourTurn {
    export class WSController {


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
                }).fail((jqXHR, textStatus, errorThrown) => {
                    console.log(">>> FAIL [" + jqXHR + "] [" + textStatus + "] [" + errorThrown+"]" );
            });
        }

        static Play( cardid: number, line: number, slot: number) {
            $.ajax({
                url: WSController.googleUrl,
                type: "GET",
                data: { command: "play", matchID: FireBaseController.Instance.matchID, cardid: cardid, line: line, slot: slot },
                dataType: 'jsonp',
                crossDomain: true,
                contentType: "application/json"
            }).done((data, status) => {
                console.log(">>> DONE " + status + " " + data.res);
            }).fail((jqXHR, textStatus, errorThrown) => {
                console.log(">>> FAIL [" + jqXHR + "] [" + textStatus + "] [" + errorThrown + "]");
                Card.response = null;
            });
        }

        static EndTurn() {
            $.ajax({
                url: WSController.googleUrl,
                type: "GET",
                data: { command: "endt", matchID: FireBaseController.Instance.matchID },
                dataType: 'jsonp',
                crossDomain: true,
                contentType: "application/json"
            }).done((data, status) => {
                console.log(">>> DONE " + status + " " + data.res);
            }).fail((jqXHR, textStatus, errorThrown) => {
                console.log(">>> FAIL [" + jqXHR + "] [" + textStatus + "] [" + errorThrown + "]");
                Card.response = null;
            });
        }
    }
}
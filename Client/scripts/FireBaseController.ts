
module YourTurn {
    export class FireBaseController {
        static Instance: FireBaseController;

        authData: FirebaseAuthData;

        firebase: Firebase;
        sessionsRef: Firebase;
        mySessionRef: FirebaseWithPromise<void>;

        constructor() {
            FireBaseController.Instance = this;            
            this.firebase = new Firebase("https://glaring-torch-9586.firebaseio.com/");
//            this.readWriteTest();
        }

        facebookLogin(onOk, onError = null) {
            this.firebase.authWithOAuthPopup("facebook", (error, authData) => {
                if (!error) {
                    this.authData = authData;
                    this.mySessionRef = this.firebase.child("sessions").push();
                    this.mySessionRef.onDisconnect().remove();
                    this.mySessionRef.update({ userID: this.authData.uid, userState: "OnLine" });
                    if (onOk != null) onOk();
                }
                else {
                    console.log("Error " + error);
                    if (onError!=null) onError();
                }
            }, { remember: "sessionOnly", scope: "user_likes" });
        }
        /*
        readWriteTest() {
            var test: Array<number> = [1, 2, 3,4,5,6,7,8,9,10];
            

            var dataRef = this.firebase.child("sessions");
            dataRef.set({ texto: "Hola Mundo", array: test });

            dataRef.on("value", function (snapshot) {
                console.log(snapshot.val());
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }
        */
        subscribeToActions(matchid: string, onAction: any) {
            this.firebase.child("actions").child(matchid).child("USERID").on("child_added", function (snapshot) {
                onAction( Number(snapshot.key()), snapshot.val());
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }
    }
}
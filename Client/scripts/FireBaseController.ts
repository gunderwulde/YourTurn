
module YourTurn {
    export class FireBaseController {
        static Instance: FireBaseController;

        authData: FirebaseAuthData;

        firebase: Firebase;
        sessionsRef: Firebase;
        mySessionRef: FirebaseWithPromise<void>;

        constructor() {
            FireBaseController.Instance = this;            
            this.firebase       = new Firebase("https://glaring-torch-9586.firebaseio.com/");
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

        readWriteTest() {
            var dataRef = this.firebase.child("data");
            dataRef.set({ texto: "Hola Mundo" });
            dataRef.on("value", function (snapshot) {
                console.log(snapshot.val());
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }
    }
}
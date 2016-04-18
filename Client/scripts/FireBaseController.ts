
module YourTurn {
    export class FireBaseController {
        static Instance: FireBaseController;

        authData: FirebaseAuthData;
        matchID: string;

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
                    authData.uid = authData.uid.replace(":", "_");
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

        subscribeToActions(onAction: any) {
            console.log("subscribeToActions " + FireBaseController.Instance.matchID + "/" + FireBaseController.Instance.authData.uid);
            this.firebase.child("actions").child(FireBaseController.Instance.matchID+"/"+FireBaseController.Instance.authData.uid).on("child_added", function (snapshot) {
                onAction( Number(snapshot.key()), snapshot.val());
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }
    }
}

module YourTurn {
    export class FireBaseController {
        static Instance: FireBaseController;
        userid: string;
        userURL: string;
        firebase: Firebase;
        constructor() {
            FireBaseController.Instance = this;
            this.firebase = new Firebase("https://glaring-torch-9586.firebaseio.com/");
        }

        facebookLogin(onOk, onError = null) {
            
            this.firebase.authWithOAuthPopup("facebook", (error, authData) => {
                if (!error) {
                    this.userid = authData.facebook.id;
                    this.userURL = authData.facebook.profileImageURL;
                    var userNode = this.firebase.child("users").child(this.userid);
                    userNode.set({ provider: authData.provider, name: authData.facebook.cachedUserProfile.first_name });
                    FireBaseController.Instance.SessionPush();
                    if (onOk != null) onOk();
                }
                else {
                    console.log("Error " + error);
                    if (onError!=null) onError();
                }
            }, { remember: "sessionOnly", scope: "user_likes" });
        }

        SessionPush() {
            var sessionsRef = this.firebase.child("sessions");
            var mySessionRef = sessionsRef.push();
            mySessionRef.onDisconnect().remove();
//            update({endedAt: Firebase.ServerValue.TIMESTAMP});
            mySessionRef.update( { userState: "OnLine" } );
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
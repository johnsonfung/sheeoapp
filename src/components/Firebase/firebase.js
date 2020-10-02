import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyASSRgZhafOzl_ExT4ifilEIHpraXpGtQs",
  authDomain: "sheeo-5d029.firebaseapp.com",
  databaseURL: "https://sheeo-5d029.firebaseio.com",
  projectId: "sheeo-5d029",
  storageBucket: "sheeo-5d029.appspot.com",
  messagingSenderId: "509816580159",
  appId: "1:509816580159:web:6f06a6a2d5625fbbcf308a",
  measurementId: "G-1Y0REDLV2X",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.fieldValue = app.firestore.FieldValue;
    this.db = app.firestore();
  }
  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  async doSendSignInLinkToEmail(email, actionCodeSettings) {
    await this.auth.sendSignInLinkToEmail(email, actionCodeSettings);
  }

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then((snapshot) => {
            const dbUser = snapshot.data();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = (uid) => this.db.doc(`users/${uid}`);

  users = () => this.db.collection("users");

  // *** CLIENTS API ***

  clientList = (uid) => this.db.doc(`clients/${uid}`);
  clients = () => this.db.collection("clients");

  // *** Message API ***

  message = (uid) => this.db.doc(`messages/${uid}`);

  messages = () => this.db.collection("messages");
}

export default Firebase;

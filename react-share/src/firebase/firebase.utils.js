import firebase from "firebase/app";
import "firebase/auth";
import { customErrorHandler } from "../helper/customErrorHandler";
//firestore

const devConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

// const prodConfig = {};

// const config = process.env.NODE_ENV === "development" ? devConfig : prodConfig;

class Firebase {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(devConfig);
    }
    this.firebaseAuth = firebase.auth();
  }
  // register registerWithEmailAndPassword
  async register(displayName, email, password) {
    try {
      await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
      this.firebaseAuth.currentUser.updateProfile({
        displayName,
      });
    } catch (err) {
      console.log("F. Error:", err);
    }
  }

  // sign in/up with google GoogleAuthProvider
  useGoogleProvider() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: "select_account" });
    this.firebaseAuth.signInWithPopup(googleProvider);
  }

  // login  signInWithEmailAndPassword
  async signIn(email, password) {
    try {
      await this.firebaseAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      return customErrorHandler(error);
    }
  }

  // logout signOut
  signOut() {
    this.firebaseAuth.signOut();
  }

  // forgot password sendPasswordResetEmail
  async forgotPassword(email) {
    try {
      await this.firebaseAuth.sendPasswordResetEmail(email);
      window.location.href = "/";
    } catch (error) {
      return customErrorHandler(error);
    }
  }
}

export default new Firebase();

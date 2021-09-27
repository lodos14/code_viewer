import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBc9559594cbGbQYY57xRTe128rYDyzpRs",
  authDomain: "web-project-c3c1a.firebaseapp.com",
  databaseURL:
    "https://web-project-c3c1a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-project-c3c1a",
  storageBucket: "web-project-c3c1a.appspot.com",
  messagingSenderId: "271084988333",
  appId: "1:271084988333:web:9cd56e8f8d16f9c6a6e324",
};

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
export const dbService = firebase.database();

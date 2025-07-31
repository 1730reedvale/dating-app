// /src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASN4XkGxvEG0fEh9TSRRzGryySZlqqoK0",
  authDomain: "dating-10622.firebaseapp.com",
  projectId: "dating-10622",
  storageBucket: "dating-10622.appspot.com",
  messagingSenderId: "112936602392",
  appId: "1:112936602392:web:4c1dea4af99d8e57fe6c6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

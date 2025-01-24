import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// 🔹 Replace with your Firebase config
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

const firebaseConfig = {
    apiKey: "AIzaSyAtjK1_ZxMGghXnLlQEnl43XAZuwCh9VX8",
    authDomain: "rufrent.firebaseapp.com",
    projectId: "rufrent",
    storageBucket: "rufrent.firebasestorage.app",
    messagingSenderId: "129681392863",
    appId: "1:129681392863:web:0c286f2e0ba2ba3704556a",
    measurementId: "G-GRVH4EBM8S"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup };

// firebase.js
// import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth'

// // Firebase configuration (replace with your actual credentials)
// const firebaseConfig = {
//     apiKey: "AIzaSyAtjK1_ZxMGghXnLlQEnl43XAZuwCh9VX8",
//     authDomain: "rufrent.firebaseapp.com",
//     projectId: "rufrent",
//     storageBucket: "rufrent.firebasestorage.app",
//     messagingSenderId: "129681392863",
//     appId: "1:129681392863:web:0c286f2e0ba2ba3704556a",
//     measurementId: "G-GRVH4EBM8S"
//   };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export default firebase
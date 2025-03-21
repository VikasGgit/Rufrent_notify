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
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//     apiKey: "AIzaSyAtjK1_ZxMGghXnLlQEnl43XAZuwCh9VX8",
//     authDomain: "rufrent.firebaseapp.com",
//     projectId: "rufrent",
//     storageBucket: "rufrent.firebasestorage.app",
//     messagingSenderId: "129681392863",
//     appId: "1:129681392863:web:0c286f2e0ba2ba3704556a",
//     measurementId: "G-GRVH4EBM8S"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyCrD91B0ZlzE3eE2N7TSgAsxcqPP58lkfM",
  authDomain: "fish-monitoring-project.firebaseapp.com",
  databaseURL: "https://fish-monitoring-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fish-monitoring-project",
  storageBucket: "fish-monitoring-project.firebasestorage.app",
  messagingSenderId: "849201828604",
  appId: "1:849201828604:web:977c7220649d57562a3d79",
  measurementId: "G-GH8Z6M4DLH"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup };

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
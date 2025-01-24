// firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0lGqyypV6DopBlsVMomDkIr4ME_QtcXk",
  authDomain: "rufrent-114aa.firebaseapp.com",
  projectId: "rufrent-114aa",
  storageBucket: "rufrent-114aa.firebasestorage.app",
  messagingSenderId: "854805931482",
  appId: "1:854805931482:web:122232b200fa0fb2544ce3",
  measurementId: "G-CD8BCZL0SW"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // Google Auth Provider
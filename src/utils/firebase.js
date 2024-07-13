// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQkl66KNSom8ShAblGuyen2xE_VnEIMG8",
  authDomain: "final-year-project-b5afb.firebaseapp.com",
  databaseURL: "https://final-year-project-b5afb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "final-year-project-b5afb",
  storageBucket: "final-year-project-b5afb.appspot.com",
  messagingSenderId: "845350144701",
  appId: "1:845350144701:web:d20a3def5c11d2290845d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleAuthProvider = new GoogleAuthProvider();
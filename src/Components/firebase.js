// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfmOeMkw1_NKpioOGV2nR2xJVdFrBR-HI",
  authDomain: "abbasi-paper.firebaseapp.com",
  projectId: "abbasi-paper",
  storageBucket: "abbasi-paper.appspot.com",
  messagingSenderId: "892545601554",
  appId: "1:892545601554:web:574f26aca5beedca67c8cb",
  measurementId: "G-YT8L88J59F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
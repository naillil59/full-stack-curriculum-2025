// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOYRovfhbtzta7eIcEScqfOTuf3xawJWw",
  authDomain: "week7-demo-b9258.firebaseapp.com",
  projectId: "week7-demo-b9258",
  storageBucket: "week7-demo-b9258.firebasestorage.app",
  messagingSenderId: "446664300378",
  appId: "1:446664300378:web:1ec91a6a012d8ea22c4563",
  measurementId: "G-M5YDWERNYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
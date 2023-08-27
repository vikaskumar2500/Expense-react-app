// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAktSJREGaOOQZ3w_37naEfQWspAMQlyCE",
  authDomain: "expense8-react.firebaseapp.com",
  projectId: "expense8-react",
  storageBucket: "expense8-react.appspot.com",
  messagingSenderId: "931962819109",
  appId: "1:931962819109:web:345706e27b1166653765cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

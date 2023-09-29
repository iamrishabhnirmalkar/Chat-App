// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHWkndAUKCjWPlWD4oqfZs7vxttl94Yko",
  authDomain: "chatapp-d4e51.firebaseapp.com",
  projectId: "chatapp-d4e51",
  storageBucket: "chatapp-d4e51.appspot.com",
  messagingSenderId: "796537255222",
  appId: "1:796537255222:web:5f0be718f304e873a66f97",
  measurementId: "G-TF1R1PF1Y0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

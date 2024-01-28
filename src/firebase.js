// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiy5kXz-eZAotgyOBI5cp6VwRsiGt4QC0",
  authDomain: "unlikedout-clone.firebaseapp.com",
  projectId: "unlikedout-clone",
  storageBucket: "unlikedout-clone.appspot.com",
  messagingSenderId: "928142644276",
  appId: "1:928142644276:web:b71d754cd803899dcba661",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;

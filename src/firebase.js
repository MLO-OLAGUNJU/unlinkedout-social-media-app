import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiy5kXz-eZAotgyOBI5cp6VwRsiGt4QC0",
  authDomain: "unlikedout-clone.firebaseapp.com",
  projectId: "unlikedout-clone",
  storageBucket: "unlikedout-clone.appspot.com",
  messagingSenderId: "928142644276",
  appId: "1:928142644276:web:b71d754cd803899dcba661",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);

export default app;

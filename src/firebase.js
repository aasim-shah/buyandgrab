import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyD_xqr2CJfnNrLR1EsFWv4bWV73jUfmlfU",
  authDomain: "online-store-65c2e.firebaseapp.com",
  projectId: "online-store-65c2e",
  storageBucket: "online-store-65c2e.appspot.com",
  messagingSenderId: "766673491650",
  appId: "1:766673491650:web:ed2f565a8a3dd36a554d5b"
};

const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

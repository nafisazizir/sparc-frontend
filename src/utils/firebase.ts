import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDu9mIO4Cp6Y96Z-mWgxmwIxlIn-Hetxkg",
  authDomain: "nasa-sparc.firebaseapp.com",
  projectId: "nasa-sparc",
  storageBucket: "nasa-sparc.appspot.com",
  messagingSenderId: "13984042054",
  appId: "1:13984042054:web:90e598ba3c3fe6dbacce47",
  measurementId: "G-Z9N70M487S",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

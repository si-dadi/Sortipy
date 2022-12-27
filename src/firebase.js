import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDThCJ0p8nt3b15h_QXo_848OZHR4Srac8",
  authDomain: "sortipy-139bc.firebaseapp.com",
  projectId: "sortipy-139bc",
  storageBucket: "sortipy-139bc.appspot.com",
  messagingSenderId: "362588771263",
  appId: "1:362588771263:web:de4eba48e23fc8d97b870a",
  measurementId: "G-DNYMRJ99BP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
export {auth, provider, fbProvider};

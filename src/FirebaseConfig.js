import {initializeApp} from 'firebase/app'
import { getAuth, GoogleAuthProvider ,signOut} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
   apiKey: "AIzaSyBKVmES6Td5rjuS0uZ-5rHiIfeZcuagwss",
  authDomain: "chatapp-b04c3.firebaseapp.com",
  projectId: "chatapp-b04c3",
  storageBucket: "chatapp-b04c3.appspot.com",
  messagingSenderId: "572375727223",
  appId: "1:572375727223:web:44d3cc1c8478fb0d661a72",
  measurementId: "G-NN9FF6PDZK"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const db = firebase.firestore()

export const provider = new GoogleAuthProvider();



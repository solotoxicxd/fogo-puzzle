import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZQ1fgm7-dGy4ppYPxikXGOL_OstbN73w",
  authDomain: "fogo-puzzle.firebaseapp.com",
  projectId: "fogo-puzzle",
  storageBucket: "fogo-puzzle.firebasestorage.app",
  messagingSenderId: "47930088719",
  appId: "1:47930088719:web:0b8ce1bfc641432e98327a",
  measurementId: "G-BVLQ0L1C34"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

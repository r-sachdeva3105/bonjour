import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAw2G4v_Oy8tIqLs5RnzIYThSkAa2ADfa4",
    authDomain: "bonjour-react-app.firebaseapp.com",
    projectId: "bonjour-react-app",
    storageBucket: "bonjour-react-app.appspot.com",
    messagingSenderId: "1048103355639",
    appId: "1:1048103355639:web:9fd3b90254811a2f80fff2",
    measurementId: "G-70EW6LZZJ3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIcYN9zTNjfwCAN7Ti6M4VwSjZn2FkTJw",
  authDomain: "emeka-cb526.firebaseapp.com",
  projectId: "emeka-cb526",
  storageBucket: "emeka-cb526.firebasestorage.app",
  messagingSenderId: "814619735088",
  appId: "1:814619735088:web:7cea3cb73a38dcf2aba9f5"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth();
 export const db = getFirestore();
 export const storage = getStorage();
 
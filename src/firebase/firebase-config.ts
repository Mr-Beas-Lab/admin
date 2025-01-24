import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6q3j7n24d4Te38xV7RW0RSjP_tCSRkF0",
  authDomain: "mrjohn-8ee8b.firebaseapp.com",
  projectId: "mrjohn-8ee8b",
  storageBucket: "mrjohn-8ee8b.firebasestorage.app",
  messagingSenderId: "662877699866",
  appId: "1:662877699866:web:451ade51fbfafafed236a3",
  measurementId: "G-BBLWJYWS31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const githubProvider = new GithubAuthProvider();

// Initialize Firestore
const db = getFirestore(app);

export { auth, githubProvider, db, collection, addDoc };

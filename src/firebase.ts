import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWAN9GvmTDYQGnz01BqtwHVOIBRL-KbLg",
  authDomain: "reloexpress-c056e.firebaseapp.com",
  projectId: "reloexpress-c056e",
  storageBucket: "reloexpress-c056e.firebasestorage.app",
  messagingSenderId: "564032191988",
  appId: "1:564032191988:web:3a38d167958e3c68940da1",
  measurementId: "G-GWPSHYG09P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

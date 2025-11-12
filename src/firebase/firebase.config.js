// Import the functions you need from the SDKs you need
import { initializeApp , } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzPBiJTo9u6bwIifNqgzY4P3y4xy6NKp4",
  authDomain: "habit-tracker-a1c4e.firebaseapp.com",
  projectId: "habit-tracker-a1c4e",
  storageBucket: "habit-tracker-a1c4e.firebasestorage.app",
  messagingSenderId: "365970118763",
  appId: "1:365970118763:web:2d957223a377c8ffc7f92e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
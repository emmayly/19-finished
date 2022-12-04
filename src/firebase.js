// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfw_ITq1Okk399V8SUgaJU1QsKLIKcclM",
  authDomain: "retail-management-ccd0b.firebaseapp.com",
  projectId: "retail-management-ccd0b",
  storageBucket: "retail-management-ccd0b.appspot.com",
  messagingSenderId: "365969318027",
  appId: "1:365969318027:web:f01fa69d44a35af90af48e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();

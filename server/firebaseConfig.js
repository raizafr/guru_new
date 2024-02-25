// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCQgQ-yjZTEc0tkQ9ArFzormarxVOILM3Q",
  authDomain: "guru-clone.firebaseapp.com",
  projectId: "guru-clone",
  storageBucket: "guru-clone.appspot.com",
  messagingSenderId: "360779876222",
  appId: "1:360779876222:web:b80ef700f56663c007552f",
  measurementId: "G-8PQMMV220Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

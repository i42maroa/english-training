// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQLursdshc8NV7ov-hl1O_iTvKQb9-84o",
  authDomain: "english-training-9d2bb.firebaseapp.com",
  projectId: "english-training-9d2bb",
  storageBucket: "english-training-9d2bb.appspot.com",
  messagingSenderId: "871056028400",
  appId: "1:871056028400:web:74d6473b1d9a9b65374835",
  measurementId: "G-FXCXE24PGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
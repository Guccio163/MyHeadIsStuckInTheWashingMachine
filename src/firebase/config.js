// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrhR6cc9UZDbI5NcUvFZ-kpgjcNW-Fn5c",
  authDomain: "tagapp-5f119.firebaseapp.com",
  projectId: "tagapp-5f119",
  storageBucket: "tagapp-5f119.appspot.com",
  messagingSenderId: "711241470401",
  appId: "1:711241470401:web:1781cb5ad85d5b7a0c9f40",
  measurementId: "G-YGJTM2CMFM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth
} from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage, ref } from "firebase/storage";



import {  API_KEY, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from "@env";

// import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "tagapp-5f119.firebaseapp.com",
  projectId: "tagapp-5f119",
  storageBucket: "tagapp-5f119.appspot.com",
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);


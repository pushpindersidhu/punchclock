// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDf4Lmbrn6oYovZNAe21UhK7p13U4-nJY4",
    authDomain: "punchclock-dev.firebaseapp.com",
    projectId: "punchclock-dev",
    storageBucket: "punchclock-dev.appspot.com",
    messagingSenderId: "310639448514",
    appId: "1:310639448514:web:54d0d4ee8f302982a6065b",
    measurementId: "G-8MHPXSCSHC",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);

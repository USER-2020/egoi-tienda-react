import firebase, { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzXYMEJXG7s8DtArQjf0GPh48HOYOmYSo",
    authDomain: "egoi-user-app.firebaseapp.com",
    projectId: "egoi-user-app",
    storageBucket: "egoi-user-app.appspot.com",
    messagingSenderId: "1058580689959",
    appId: "1:1058580689959:web:9239ca21ad067de63a0a02",
    measurementId: "G-5TL8PV3QG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


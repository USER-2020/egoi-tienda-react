import firebase, { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbwpKgyvjcxQYXXe7teMoAS0BC4TbDngs",
    authDomain: "egoi-react-web.firebaseapp.com",
    projectId: "egoi-react-web",
    storageBucket: "egoi-react-web.appspot.com",
    messagingSenderId: "334873732349",
    appId: "1:334873732349:web:74c562c5caa0ddd5feca94",
    measurementId: "G-GX58RJGFPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


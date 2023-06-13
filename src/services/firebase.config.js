// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
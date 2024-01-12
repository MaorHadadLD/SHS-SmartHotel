// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBoDKauyiDVKCTMcu8w6fyinvvKlUjEzH4",
    authDomain: "smarthotel-a2786.firebaseapp.com",
    databaseURL: "https://smarthotel-a2786-default-rtdb.firebaseio.com",
    projectId: "smarthotel-a2786",
    storageBucket: "smarthotel-a2786.appspot.com",
    messagingSenderId: "886248898529",
    appId: "1:886248898529:web:5a2221dfaa98d86aca1ca0",
    measurementId: "G-NERLK9DN33"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

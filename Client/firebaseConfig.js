import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAL4cCeyJZBlVJMm72kB1fuHrwyGT7PTCs",
    authDomain: "shs-smart-hotel.firebaseapp.com",
    projectId: "shs-smart-hotel",
    storageBucket: "shs-smart-hotel.appspot.com",
    messagingSenderId: "779876000324",
    appId: "1:779876000324:web:a8434fc6058fbc12711211",
    measurementId: "G-W86GBRNFQX"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

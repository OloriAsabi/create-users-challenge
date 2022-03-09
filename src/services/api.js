import { initializeApp } from 'firebase/app';

// Firbase database 

const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "create-user-challenge.firebaseapp.com",
    projectId: "create-user-challenge",
    storageBucket: "create-user-challenge.appspot.com",
    messagingSenderId: "298099410332",
    appId: "1:298099410332:web:b574c2ac7fd1845550b459",
    measurementId: "G-D3KE307GHD"
};


export const app = initializeApp(firebaseConfig);
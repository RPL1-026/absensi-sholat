// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAqxuye8G2GWgyrNWAwZZg6gz_XM0TlZEQ",
    authDomain: "rplsatu026-4f987.firebaseapp.com",
    projectId: "rplsatu026-4f987",
    storageBucket: "rplsatu026-4f987.appspot.com",
    messagingSenderId: "523064373703",
    appId: "1:523064373703:web:0c78d01dd1cac0faa9a9e2",
    measurementId: "G-BQHJZMNSN8"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore
const db = getFirestore(app);

export { db };
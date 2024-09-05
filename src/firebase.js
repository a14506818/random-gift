// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwtKoJc7_B-4ezUioEy2eQsjHQJbYKHgg",
  authDomain: "random-gift-4d304.firebaseapp.com",
  databaseURL:
    "https://random-gift-4d304-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "random-gift-4d304",
  storageBucket: "random-gift-4d304.appspot.com",
  messagingSenderId: "462665587113",
  appId: "1:462665587113:web:37399266ebd019b418ccb8",
  measurementId: "G-R64YE9LVMY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

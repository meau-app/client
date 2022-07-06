import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyCR9iTZu4Yw6eIgzfCHFfcY0W4FOzGHJpE",
  authDomain: "unb-adote.firebaseapp.com",
  projectId: "unb-adote",
  storageBucket: "unb-adote.appspot.com",
  messagingSenderId: "148599077912",
  appId: "1:148599077912:web:e962faf951a734f1fc976d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()

export {auth}

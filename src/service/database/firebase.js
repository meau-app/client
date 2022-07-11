import firebase from 'firebase/compat/app';

import 'firebase/compat/database';
import 'firebase/compat/auth';

let firebaseConfig = {
  apiKey: "AIzaSyCR9iTZu4Yw6eIgzfCHFfcY0W4FOzGHJpE",
  authDomain: "unb-adote.firebaseapp.com",
  projectId: "unb-adote",
  storageBucket: "unb-adote.appspot.com",
  messagingSenderId: "148599077912",
  appId: "1:148599077912:web:e962faf951a734f1fc976d"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()

export {auth}

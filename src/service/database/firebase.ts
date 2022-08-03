import { initializeApp } from 'firebase/app';

import 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

let firebaseConfig = {
  apiKey: 'AIzaSyCR9iTZu4Yw6eIgzfCHFfcY0W4FOzGHJpE',
  authDomain: 'unb-adote.firebaseapp.com',
  projectId: 'unb-adote',
  storageBucket: 'unb-adote.appspot.com',
  messagingSenderId: '148599077912',
  appId: '1:148599077912:web:e962faf951a734f1fc976d',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };

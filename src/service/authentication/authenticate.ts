import * as SecureStore from 'expo-secure-store';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { User } from '../api/models/user';
import { auth, firestore } from '../database/firebase';

module Authentication {
  export async function authenticate(
    email: string,
    password: string
  ): Promise<boolean> {
    return signInWithEmailAndPassword(auth, email, password)
      .then(async credentials => {
        const email = credentials.user?.email;
        const token = await credentials.user?.getIdToken(true);
        if (token && email) {
          SecureStore.setItemAsync('user_secure_token', token);
          SecureStore.setItemAsync('user_email', email!);
          return true;
        } else {
          // failed to retrieve the token for some unknown reason (?)
          return Promise.reject('failed to retrieve user information');
        }
      })
      .catch(error => {
        const code = error.code;
        const reason = error.message;
        const message = `failed to login (${code} - ${reason})`;

        return Promise.reject(message);
      });
  }

  export async function check(): Promise<boolean> {
    let token = await SecureStore.getItemAsync('user_secure_token');
    if (token != '' && token != null) {
      return false;
    }

    return true;
  }

  export async function register(
    user: User,
    email: string,
    password: string
  ): Promise<any> {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async v => {
        let token = await v.user?.getIdToken();
        if (token) {
          SecureStore.setItemAsync('user_secure_token', token);
        }

        setDoc(doc(firestore, 'users', email), {
          id: v.user?.email,
          age: user.properties.age,
          name: user.properties.name,
          phone: user.properties.phone,
          username: user.properties.username,
          city: user.properties.city,
          state: user.properties.state,
          address: user.properties.address,
        })
          .then(() => {
            return Promise.resolve('');
          })
          .catch(e => {
            return Promise.reject('Falha ao salvar dados');
          });
      })
      .catch(error => {
        if (error.code === 'auth/weak-password') {
          return Promise.reject('Sua senha deve ter pelo menos 6 caracteres');
        } else if (error.code === 'auth/invalid-email') {
          Promise.reject('Email inválido');
        } else {
          Promise.reject('Email em uso, tente outro.' + error.code);
        }
      });
  }
}

export default Authentication;

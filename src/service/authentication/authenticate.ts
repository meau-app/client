import * as SecureStore from 'expo-secure-store';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../database/firebase';

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
          SecureStore.setItemAsync('user_email', email!)
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
}

export default Authentication;

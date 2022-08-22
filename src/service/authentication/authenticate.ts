import * as SecureStore from 'expo-secure-store';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser
} from 'firebase/auth';
import { User } from '../api/models/user';
import { auth } from '../database/firebase';

module Authentication {
  export const TOKEN = 'user_secure_token';

  export async function login(
    email: string,
    password: string
  ): Promise<boolean> {
    return signInWithEmailAndPassword(auth, email, password)
      .then(async credentials => {
        const email = credentials.user?.email;
        const token = await credentials.user?.getIdToken(true);
        if (token && email) {
          SecureStore.setItemAsync(TOKEN, token);
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

  export async function logout(): Promise<boolean> {
    try {
      await SecureStore.setItemAsync(TOKEN, '');
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(false);
    }
  }

  export async function check(): Promise<boolean> {
    let token = await SecureStore.getItemAsync(TOKEN);
    if (token === undefined || token === null || token === '') {
      return Promise.reject(false);
    }

    return Promise.resolve(true);
  }

  export async function register(
    user: User,
    email: string,
    password: string
  ): Promise<any> {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async v => {
        try {
          await User.save(user);

          let token = await v.user?.getIdToken();
          if (token) {
            SecureStore.setItemAsync(TOKEN, token);
          }

          return Promise.resolve(true);
        } catch (e) {
            // rollback action
            deleteUser(v.user)
            return Promise.reject('Falha ao registrar usuário, ' + e)
        }
      })
      .catch(error => {
        if (error.code === 'auth/weak-password') {
          return Promise.reject('Sua senha deve ter pelo menos 6 caracteres');
        } else if (error.code === 'auth/invalid-email') {
          return Promise.reject('Email inválido');
        } else if (error.code === 'auth/email-already-exists') {
          return Promise.reject('Email em uso, tente outro.');
        } else {
          return Promise.reject(error);
        }
      });
  }
}

export default Authentication;

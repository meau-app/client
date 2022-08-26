import * as SecureStore from 'expo-secure-store';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, firestore } from '../../database/firebase';
import { Entity } from './entity';

/**
 * NotificationResponse is a representation of response that has been sent by the
 * backend.
 */
interface NotificationResponse {
  requestor_email: string;
  proprietary_email: string;
  pet_id: string;
}

export class Notification extends Entity {
  public properties = {
    requestor_email: '',
    proprietary_email: '',
    pet: '',
  };

  constructor(
    requestor_email?: string,
    proprietary_email?: string,
    pet?: string
  ) {
    super();

    this.properties.requestor_email =
      requestor_email !== undefined ? requestor_email : '';
    this.properties.proprietary_email =
      proprietary_email !== undefined ? proprietary_email : '';
    this.properties.pet = pet !== undefined ? pet : '';
  }

  static build(response: NotificationResponse): Notification {
    let n = new Notification();

    n.properties.requestor_email = response.requestor_email;
    n.properties.proprietary_email = response.proprietary_email;
    n.properties.pet = response.pet_id;

    return n;
  }

  static async all(): Promise<Array<Notification>> {
    const email = auth.currentUser?.email!;

    const q = query(
      collection(firestore, 'notifications'),
      where('proprietary_email', '==', email),
      where('answered', '==', false)
    );

    try {
      const notifications = await getDocs(q);

      console.log(notifications);
    } catch (e) {
      console.error(e);
    }

    return Promise.resolve([]);
  }

  static async save(notification: Notification): Promise<Boolean> {
    return Promise.resolve(true);
  }
}

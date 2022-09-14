import * as SecureStore from 'expo-secure-store';
import { collection, getDoc, getDocs, query, QueryDocumentSnapshot, where, DocumentData } from 'firebase/firestore';
import { auth, firestore} from '../../database/firebase';
import { Entity } from './entity';
import { Alert } from "react-native";
/**
 * NotificationResponse is a representation of response that has been sent by the
 * backend.
 */
interface NotificationResponse {
  requestor_email: string;
  proprietary_email: string;
  pet_id: string;
  id: string;
}

export class Notification extends Entity {
  public properties = {
    requestor_email: '',
    proprietary_email: '',
    pet: '',
    id: '',
  };

  constructor(
    requestor_email?: string,
    proprietary_email?: string,
    pet?: string,
    id?: string,
  ) {
    super();

    this.properties.requestor_email =
      requestor_email !== undefined ? requestor_email : '';
    this.properties.proprietary_email =
      proprietary_email !== undefined ? proprietary_email : '';
    this.properties.pet = pet !== undefined ? pet : '';
    this.properties.id = id !== undefined ? id : '';
  }

  static build(response: QueryDocumentSnapshot<DocumentData>): Notification {
    let n = new Notification();

    n.properties.requestor_email = response.data().requestor_email;
    n.properties.proprietary_email = response.data().proprietary_email;
    n.properties.pet = response.data().pet_id;
    n.properties.id = response.id;

    return n;
  }

  static async all(): Promise<Array<Notification>> {
    let result = Array<Notification>();
    const email = auth.currentUser?.email!;

    const q = query(
      collection(firestore, 'notifications'),
      where('proprietary_email', '==', email),
      where('answered', '==', false)
    );

    try {
      const notifications = await getDocs(q);

      notifications.forEach((notification) => {
        
        let newNotification = Notification.build(notification)
        
        result.push(newNotification)

      });

      return Promise.resolve(result);
    }
   catch(e) {
      console.error(e);
      return Promise.resolve([]);
  }
}

  static async save(notification: Notification): Promise<Boolean> {
    return Promise.resolve(true);
  }
}

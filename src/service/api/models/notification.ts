import * as SecureStore from 'expo-secure-store';
import Authentication from '../../authentication/authenticate';
import { auth, firestore } from '../../database/firebase';
import Interface from '../interface';
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
    pet?: string,
  ) {
    super();

    this.properties.requestor_email = requestor_email !== undefined ? requestor_email : '';
    this.properties.proprietary_email = proprietary_email !== undefined ? proprietary_email : '';
    this.properties.pet = pet !== undefined ? pet : '';
  }

  static build(response: NotificationResponse): Notification {
    let p = new Notification();

    p.properties.requestor_email = response.requestor_email;
    p.properties.proprietary_email = response.proprietary_email;
    p.properties.pet = response.pet_id;

    return p;
  }

  static async get(id: string): Promise<Notification> {
    if (id === undefined || id.length <= 0) {
      return Promise.reject(`missing request parameter (400)`);
    }

    let result = new Notification();

    let endpoint = Interface.endpoints.pets + '/' + id;

    // method and headers
    let m = 'GET';
    let h = new Headers();
    let t = SecureStore.getItemAsync(Authentication.TOKEN);

    h.set('Authorization', 'Bearer ' + t);

    let request = await fetch(Interface.base_url + endpoint, {
      headers: h,
      method: m,
    });

    if (request.ok) {
      let response = await request.json();

      result = Notification.build(response as NotificationResponse);
    } else {
      return Promise.reject(`${request.statusText} (${request.status})`);
    }

    return Promise.resolve(result);
  }

  static async all(): Promise<Array<Notification>> {
    var user = auth.currentUser?.email!;
    const notifications = firestore.collection('notifiations');
    await notifications.doc('SF').set({
      name: 'San Francisco', state: 'CA', country: 'USA',
      capital: false, population: 860000
    });
  }

  static async save(pet: Notification): Promise<string> {
}

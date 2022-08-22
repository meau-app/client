import * as SecureStore from 'expo-secure-store';

import Authentication from '../../authentication/authenticate';
import Interface from '../interface';
import { Entity } from './entity';

export type Sex = 'male' | 'female';

/**
 * PetResponse is a representation of response that has been sent by the
 * backend.
 */
interface PetResponse {
  name: string;
  temper: string;
  adopted: boolean;
  race: string;
  sex: Sex;
  age: number;
  vaccines: Array<String>;
  pictures: Array<String>;
}

export class Pet extends Entity {
  public properties = {
    id: '',
    temper: '',
    adopted: Boolean(),
    name: '',
    race: '',
    sex: '',
    age: 0,
    vaccines: Array<String>(),
    pictures: Array<String>(),
  };

  constructor(
    name?: string,
    temper?: string,
    adopted?: boolean,
    race?: string,
    sex?: Sex,
    age?: number,
    vaccines?: Array<String>,
    pictures?: Array<String>
  ) {
    super();

    this.properties.adopted = adopted !== undefined ? adopted : false;
    this.properties.name = name !== undefined ? name : '';
    this.properties.temper = temper !== undefined ? temper : '';
    this.properties.race = race !== undefined ? race : '';
    this.properties.age = age !== undefined ? age : 0;
    this.properties.sex = sex !== undefined ? sex : 'male';
    this.properties.vaccines = vaccines !== undefined ? vaccines : [];
    this.properties.pictures = pictures !== undefined ? pictures : [];
  }

  static build(response: PetResponse): Pet {
    let p = new Pet();

    p.properties.name = response.name;
    p.properties.age = response.age;
    p.properties.sex = response.sex;
    p.properties.temper = response.temper;
    p.properties.race = response.race;
    p.properties.pictures = response.pictures;
    p.properties.vaccines = response.vaccines;
    p.properties.adopted = response.adopted;

    return p;
  }

  static async get(id: string): Promise<Pet> {
    if (id === undefined || id.length <= 0) {
        return Promise.reject(`missing request parameter (400)`);
      }

      let result = new Pet();

      let endpoint = Interface.endpoints.pets + '/' + id;

      // method and headers
      let m = 'GET';
      let h = new Headers();
      let t = SecureStore.getItemAsync(Authentication.TOKEN)

      h.set('Authorization', 'Bearer ' + t);

      let request = await fetch(Interface.base_url + endpoint, {
        headers: h,
        method: m,
      });

      if (request.ok) {
        let response = await request.json();

        result = Pet.build(response as PetResponse);
      } else {
        return Promise.reject(`${request.statusText} (${request.status})`);
      }

      return Promise.resolve(result);
  }

  static async all(): Promise<Array<Pet>> {
    let result = Array<Pet>();

    let endpoint = Interface.endpoints.pets;

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
      let objects = Object.values(response);

      objects.forEach((o) => {
        let pet = Pet.build(o as PetResponse)
        result.push(pet)
      })
    } else {
      return Promise.reject(`${request.statusText} (${request.status})`);
    }

    return Promise.resolve(result);
  }

  static async save(pet: Pet): Promise<string> {
    let endpoint = Interface.endpoints.pets;

    // method and headers
    let m = 'POST';
    let h = new Headers();
    let t = SecureStore.getItemAsync(Authentication.TOKEN);

    h.set('Authorization', 'Bearer ' + t);

    let request = await fetch(Interface.base_url + endpoint, {
      headers: h,
      method: m,
      body: JSON.stringify(pet.properties)
    });

    if (request.ok && request.status === 201) {
      return Promise.resolve('');
    }

    return Promise.reject(`${request.statusText} (${request.status})`);
  }

  static async delete(p: Pet): Promise<void> {}
}

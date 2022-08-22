import * as SecureStore from 'expo-secure-store';
import Authentication from '../../authentication/authenticate';

import Interface from '../interface';
import { Entity } from './entity';
import { Pet } from './pet';

type Gender = 'male' | 'female' | "won't say";

/**
 * UserResponse is a representation of response that has been sent by the
 * backend.
 */
export interface UserResponse {
  name: string;
  email: string;
  phone: string;
  username: string;
  city: string;
  state: string;
  address: string;
  age: number;
  gender: Gender;
  profile: string;
  pets: Array<Pet>;
}

export class User extends Entity {
  public properties = {
    name: '',
    email: '',
    phone: '',
    username: '',
    city: '',
    state: '',
    address: '',
    age: 0,
    gender: '',
    profile: '',
    pets: Array<Pet>(),
  };

  constructor(
    name?: string,
    email?: string,
    phone?: string,
    username?: string,
    city?: string,
    state?: string,
    address?: string,
    age?: number,
    gender?: Gender,
    profile?: string,
    pets?: Array<Pet>
  ) {
    super();

    this.properties.name = name !== undefined ? name : '';
    this.properties.email = email !== undefined ? email : '';
    this.properties.phone = phone !== undefined ? phone : '';
    this.properties.username = username !== undefined ? username : '';

    this.properties.city = city !== undefined ? city : '';
    this.properties.state = state !== undefined ? state : '';
    this.properties.address = address !== undefined ? address : '';
    this.properties.age = age !== undefined ? age : 0;
    this.properties.gender = gender !== undefined ? gender : '';
    this.properties.profile = profile !== undefined ? profile : '';
    this.properties.pets = pets !== undefined ? pets : Array<Pet>();
  }

  static build(response: UserResponse): User {
    let u = new User();

    u.properties.name = response.name;
    u.properties.email = response.email;
    u.properties.age = response.age;
    u.properties.phone = response.phone;
    u.properties.username = response.username;
    u.properties.profile = response.profile;
    u.properties.address = response.address;
    u.properties.city = response.city;
    u.properties.state = response.state;
    u.properties.pets = response.pets;

    return u;
  }

  /**
   *
   * @returns
   */
  static async get(id: string): Promise<User> {
    if (id === undefined || id.length <= 0) {
      return Promise.reject(`missing request parameter (400)`);
    }

    let result = new User();

    let endpoint = Interface.endpoints.users + '/' + id;

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

      result = User.build(response as UserResponse);
    } else {
      return Promise.reject(`${request.statusText} (${request.status})`);
    }

    return Promise.resolve(result);
  }

  /**
   *
   * @returns all the users within the database
   */
  static async all(): Promise<Array<User>> {
    return [];
  }

  /**
   *
   * @param user
   */
  static save(user: User): void {}
  /**
   *
   * @param user
   */
  static delete(user: User): void {}
}

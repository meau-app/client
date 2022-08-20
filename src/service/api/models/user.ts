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

  // FIXME: change for interface object when receiving it from the backend

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
    u.properties.address = response.address
    u.properties.city = response.city
    u.properties.state = response.state
    u.properties.pets = response.pets

    return u;
  }
}

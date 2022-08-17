import { Entity } from './entity';
import { Pet } from './pet';

type Gender = 'male' | 'female' | 'won\'t say'

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
    pets?: Array<Pet>,
  ) {
    super();

    this.properties.name = name !== undefined ? name : '';
    this.properties.email = email !== undefined ? email : '';
    this.properties.phone = phone !== undefined ? phone : '';
    this.properties.username = username !== undefined ? username : '';

    this.properties.city = city !== undefined ? city : '';
    this.properties.state = state !== undefined ? state : '';
    this.properties.address =address !== undefined ? address : '';
    this.properties.age = age !== undefined ? age : 0;
    this.properties.gender = gender !== undefined ? gender : '';
    this.properties.profile = profile !== undefined ? profile : '';
    this.properties.pets = pets !== undefined ? pets : Array<Pet>();
  }
}

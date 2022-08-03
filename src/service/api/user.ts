import { Entity } from './entity';

export class User extends Entity {
  public properties = {
    name: String(''),
    surname: String(''),
    email: String(''),
    phone: String(''),
    username: String(''),
  };

  constructor(
    name: string,
    surname: string,
    email: string,
    phone: string,
    username: string
  ) {
    super();

    this.properties.name = name;
    this.properties.surname = surname;
    this.properties.email = email;
    this.properties.phone = phone;
    this.properties.username = username;
  }
}

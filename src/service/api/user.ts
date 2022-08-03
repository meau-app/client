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
    name?: string,
    surname?: string,
    email?: string,
    phone?: string,
    username?: string
  ) {
    super();

    this.properties.name = name !== undefined ? name : '';
    this.properties.surname = surname !== undefined ? surname : '';
    this.properties.email = email !== undefined ? email : '';
    this.properties.phone = phone !== undefined ? phone : '';
    this.properties.username = username !== undefined ? username : '';
  }
}

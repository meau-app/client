import { objectProperty } from '@babel/types';
import { Entity } from './models/entity';
import { Pet } from './models/pet';
import { User } from './models/user';

export class Interface {
  private endpoints = {
    pets: '/pets',
    users: '/users',
  };

  private base_url = 'http://34.69.100.113';

  public async get(object: Entity, id?: string): Promise<Array<Entity>> {
    let result = Array<Entity>();
    let endpoint = '';

    if (object instanceof Pet) {
      endpoint = this.endpoints.pets;
    } else if (object instanceof User) {
      endpoint = this.endpoints.users;
    }

    if (id !== undefined && id.length > 0) {
      endpoint += '/' + id;
    }

    // method and headers
    let m = 'GET';
    let h = new Headers();
    h.set('Authorization', 'Beaerer <token>');

    let request = await fetch(this.base_url + endpoint, {
      headers: h,
      method: m,
    });

    if (request.ok) {
      let response = await request.json();
      if (response.length > 0) {
        result = Object.values(response) as Array<Entity>;
      } else {
        // returning a single object
        if (object instanceof User) {
          let user = User.build(response);
          result = new Array<User>(user);
        } else {
          result = new Array<Entity>(response);
        }
      }
    } else {
      return Promise.reject(`${request.statusText} (${request.status})`);
    }

    return Promise.resolve(result);
  }

  public save(object: Entity) {
    if (object instanceof Pet) {
    } else if (object instanceof User) {
    }
  }

  public delete(object: Entity, id: string) {}
}

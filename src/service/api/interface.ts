import { objectProperty } from '@babel/types';
import { Entity } from './models/entity';
import { Pet, PetResponse } from './models/pet';
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
        let objects = Object.values(response);
    
        if (objects instanceof Array<Pet>) {
            let pets = Array<Pet>()

            for (let i = 0; i < objects.length; i++) {
                pets.push(Pet.build(objects[i] as PetResponse));
            }

            result = pets
        } else if (object instanceof User) {
          let user = User.build(response);
          result = new Array<User>(user);
        } else if (object instanceof Pet) {
          let pet = Pet.build(response);
          result = new Array<Pet>(pet);
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

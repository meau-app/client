import { Entity } from './entity';

export type Sex = 'male' | 'female';

/**
 * PetResponse is a representation of response that has been sent by the
 * backend.
 */
export interface PetResponse {
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
}

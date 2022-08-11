import { Entity } from './entity';

export type Sex = 'male' | 'female';

export class Pet extends Entity {
  public properties = {
    id: '',
    temper: '',
    adopted: Boolean(),
    name: '',
    species: '',
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
    this.properties.species = race !== undefined ? race : '';
    this.properties.age = age !== undefined ? age : 0;
    this.properties.sex = sex !== undefined ? sex : 'male';
    this.properties.vaccines = vaccines !== undefined ? vaccines : [];
    this.properties.pictures = pictures !== undefined ? pictures : [];
  }
}

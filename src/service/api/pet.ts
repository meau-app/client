import { Entity } from './entity';

export class Pet extends Entity {
  public properties = {
    id: String(''),
    adopted: Boolean(),
    name: String(''),
    race: String(''),
    vaccines: Array<string>(),
    pictures: Array<string>(),
  };

  constructor(
    name: string,
    adopted: boolean,
    race: string,
    vaccines: Array<string>,
    pictures: Array<string>
  ) {
    super();

    this.properties.adopted = adopted;
    this.properties.name = name;
    this.properties.vaccines = vaccines;
    this.properties.pictures = pictures;
  }
}

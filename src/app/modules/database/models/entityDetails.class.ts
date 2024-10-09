import {Creator, Serializable} from '@database/interface';
// import {v4 as uuidv4} from 'uuid';

export class EntityDetails implements Serializable {
  public id: number;
  public data: any;

  constructor(params: IEntityDetails) {
    this.id = params.id;
    this.data = params.data;
  }

  getKey(): number {
    return this.id;
  }

  toJSON(): IEntityDetails {
    return {
      id: this.id,
      data: this.data
    };
  }
}

export interface IEntityDetails {
  id?: number;
  data: any;
}

export class EntityDetailsCreator extends Creator<EntityDetails> {
  factoryMethod(params: IEntityDetails): EntityDetails {
    // if(!params.id) {
    //   params.id = uuidv4();
    // }
    return new EntityDetails(params);
  }
}

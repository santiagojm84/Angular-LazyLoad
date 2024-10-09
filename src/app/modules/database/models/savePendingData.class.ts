import {Creator, Serializable} from '@database/interface';
// import {v4 as uuidv4} from 'uuid';

export class SavePendingData implements Serializable {
  public id: string;
  public Table:any;

  constructor(params: ISavePendingData) {
    this.id = params.id;
    this.Table = params.Table;
  }

  getKey(): string {
    return this.id;
  }

  toJSON(): ISavePendingData {
    return {
      id:this.id,
      Table:this.Table
    };
  }
}

export interface ISavePendingData {
  id?: string;
  Table?:any;
}

export class SavePendingDataCreator extends Creator<SavePendingData> {
  factoryMethod(params: ISavePendingData): SavePendingData {
    // if(!params.id) {
    //   params.id = uuidv4();
    // }
    return new SavePendingData(params);
  }
}

import {Creator, Serializable} from '@database/interface';
// import {v4 as uuidv4} from 'uuid';

export class EncuestasCodigoEstadistico implements Serializable {
  public Id: string;
  public Data:any;

  constructor(params: IEncuestasCodigoEstadistico) {
    this.Id = params.Id;
    this.Data = params.Data;
  }

  getKey(): string {
    return this.Id;
  }

  toJSON(): IEncuestasCodigoEstadistico {
    return {
      Id:this.Id,
      Data:this.Data
    };
  }
}

export interface IEncuestasCodigoEstadistico {
  Id?: string;
  Data?:any;
}

export class EncuestasCodigoEstadisticoCreator extends Creator<EncuestasCodigoEstadistico> {
  factoryMethod(params: IEncuestasCodigoEstadistico): EncuestasCodigoEstadistico {
    // if(!params.id) {
    //   params.id = uuidv4();
    // }
    return new EncuestasCodigoEstadistico(params);
  }
}

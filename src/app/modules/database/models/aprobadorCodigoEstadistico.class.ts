import {Creator, Serializable} from '@database/interface';
// import {v4 as uuidv4} from 'uuid';

export class AprobadorCodigoEstadistico implements Serializable {
  public Id: string;
  public Data:any;

  constructor(params: IAprobadorCodigoEstadistico) {
    this.Id = params.Id;
    this.Data = params.Data;
  }

  getKey(): string {
    return this.Id;
  }

  toJSON(): IAprobadorCodigoEstadistico {
    return {
      Id:this.Id,
      Data:this.Data
    };
  }
}

export interface IAprobadorCodigoEstadistico {
  Id?: string;
  Data?:any;
}

export class AprobadorCodigoEstadisticoCreator extends Creator<AprobadorCodigoEstadistico> {
  factoryMethod(params: IAprobadorCodigoEstadistico): AprobadorCodigoEstadistico {
    // if(!params.id) {
    //   params.id = uuidv4();
    // }
    return new AprobadorCodigoEstadistico(params);
  }
}

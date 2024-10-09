import {Creator, Serializable} from '@database/interface';
// import {v4 as uuidv4} from 'uuid';

export class RespuestasCodigoEstadistico implements Serializable {
  public Id: string;
  public Data:any;

  constructor(params: IRespuestasCodigoEstadistico) {
    this.Id = params.Id;
    this.Data = params.Data;
  }

  getKey(): string {
    return this.Id;
  }

  toJSON(): IRespuestasCodigoEstadistico {
    return {
      Id:this.Id,
      Data:this.Data
    };
  }
}

export interface IRespuestasCodigoEstadistico {
  Id?: string;
  Data?:any;
}

export class RespuestasCodigoEstadisticoCreator extends Creator<RespuestasCodigoEstadistico> {
  factoryMethod(params: IRespuestasCodigoEstadistico): RespuestasCodigoEstadistico {
    // if(!params.id) {
    //   params.id = uuidv4();
    // }
    return new RespuestasCodigoEstadistico(params);
  }
}

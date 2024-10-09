import {Creator, Serializable} from '@database/interface';
// import {v4 as uuidv4} from 'uuid';

export class PreguntasCodigoEstadistico implements Serializable {
  public Id: string;
  public Data:any;

  constructor(params: IPreguntasCodigoEstadistico) {
    this.Id = params.Id;
    this.Data = params.Data;
  }

  getKey(): string {
    return this.Id;
  }

  toJSON(): IPreguntasCodigoEstadistico {
    return {
      Id:this.Id,
      Data:this.Data
    };
  }
}

export interface IPreguntasCodigoEstadistico {
  Id?: string;
  Data?:any;
}

export class PreguntasCodigoEstadisticoCreator extends Creator<PreguntasCodigoEstadistico> {
  factoryMethod(params: IPreguntasCodigoEstadistico): PreguntasCodigoEstadistico {
    // if(!params.id) {
    //   params.id = uuidv4();
    // }
    return new PreguntasCodigoEstadistico(params);
  }
}

import {Creator, Serializable} from '@database/interface';
// import {v4 as uuidv4} from 'uuid';

export class NuevasEncuestasCodigoEstadistico implements Serializable {
  public Id: string;
  public IdGrupo:string;
  public IdCliente:string;

  constructor(params: INuevasEncuestasCodigoEstadistico) {
    this.Id = params.Id;
    this.IdGrupo = params.IdGrupo;
    this.IdCliente = params.IdCliente;
  }

  getKey(): string {
    return this.Id;
  }

  toJSON(): INuevasEncuestasCodigoEstadistico {
    return {
      Id:this.Id,
      IdGrupo:this.IdGrupo,
      IdCliente:this.IdCliente
    };
  }
}

export interface INuevasEncuestasCodigoEstadistico {
  Id?: string;
  IdGrupo?:string;
  IdCliente?:string;
}

export class NuevasEncuestasCodigoEstadisticoCreator extends Creator<NuevasEncuestasCodigoEstadistico> {
  factoryMethod(params: INuevasEncuestasCodigoEstadistico): NuevasEncuestasCodigoEstadistico {
    // if(!params.id) {
    //   params.id = uuidv4();
    // }
    return new NuevasEncuestasCodigoEstadistico(params);
  }
}

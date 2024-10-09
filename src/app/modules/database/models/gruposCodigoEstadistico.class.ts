import {Creator, Serializable} from '@database/interface';
// import {v4 as uuidv4} from 'uuid';

export class GruposCodigoEstadistico implements Serializable {
  public Id: string;
  public Codigo:string;
  public Nombre:string;
  public Segmentacion:boolean;
  public Segmentaciones:string;
  public SettingsPregunta:string;
//   public data: any;

  constructor(params: IGruposCodigoEstadistico) {
    this.Id = params.Id;
    this.Codigo = params.Codigo;
    this.Nombre = params.Nombre;
    this.Segmentacion = params.Segmentacion;
    this.Segmentaciones = params.Segmentaciones;
    this.SettingsPregunta = params.SettingsPregunta;
    // this.data = params.data;
  }

  getKey(): string {
    return this.Id;
  }

  toJSON(): IGruposCodigoEstadistico {
    return {
        Id: this.Id,
        Codigo: this.Codigo,
        Nombre: this.Nombre,
        Segmentacion: this.Segmentacion,
        Segmentaciones: this.Segmentaciones,
        SettingsPregunta: this.SettingsPregunta,
    //   data: this.data
    };
  }
}

export interface IGruposCodigoEstadistico {
    Id?: string;
    Codigo?:string;
    Nombre?:string;
    Segmentacion?:boolean;
    Segmentaciones?:string;
    SettingsPregunta?:string;
//   data: any;
}

export class GruposCodigoEstadisticoCreator extends Creator<GruposCodigoEstadistico> {
  factoryMethod(params: IGruposCodigoEstadistico): GruposCodigoEstadistico {
    // if(!params.id) {
    //   params.id = uuidv4();
    // }
    return new GruposCodigoEstadistico(params);
  }
}

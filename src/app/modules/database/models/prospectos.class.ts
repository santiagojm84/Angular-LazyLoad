import {Creator, Serializable} from '@database/interface';
// import {v4 as uuidv4} from 'uuid';

export class Prospectos implements Serializable {
  public id: number;
  public id_agent: number;
  public guid: string;
  public name: string;
  public nit: string;
  public city: string;
  public codigoEquivalencia: string;

  constructor(params: IProspectos) {
    this.id = params.id;
    this.id_agent = params.id_agent;
    this.guid = params.guid;
    this.name = params.name;
    this.nit = params.nit;
    this.city = params.city;
    this.codigoEquivalencia = params.codigoEquivalencia;
  }

  getKey(): string {
    return this.guid;
  }

  toJSON(): IProspectos {
    return {
      id: this.id,
      id_agent: this.id_agent,
      guid: this.guid,
      name: this.name,
      nit: this.nit,
      city: this.city,
      codigoEquivalencia: this.codigoEquivalencia
    };
  }
}

export interface IProspectos {
  id?: number;
  id_agent?: number;
  guid?: string;
  name?: string;
  nit?: string;
  city?: string;
  codigoEquivalencia?: string;
}

export class ProspectosCreator extends Creator<Prospectos> {
  factoryMethod(params: IProspectos): Prospectos {
    // if(!params.id) {
    //   params.id = uuidv4();
    // }
    return new Prospectos(params);
  }
}

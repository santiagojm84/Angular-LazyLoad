import {Creator, Serializable} from '@database/interface';
// import {v4 as uuidv4} from 'uuid';

export class DocumentosClipadre implements Serializable {
  public Clipadre:string;
  public Documentos:Array<Documentos>;

  constructor(params: IDocumentosClipadre) {
    this.Clipadre = params.Clipadre;
    this.Documentos = params.Documentos;
  }

  getKey(): string {
    return this.Clipadre;
  }

  toJSON(): IDocumentosClipadre {
    return {
      Clipadre:this.Clipadre,
      Documentos:this.Documentos
    };
  }
}

export interface IDocumentosClipadre {
  Clipadre?: string;
  Documentos?: Array<Documentos>;
}

export class DocumentosClipadreCreator extends Creator<DocumentosClipadre> {
  factoryMethod(params: IDocumentosClipadre): DocumentosClipadre {
    // if(!params.id) {
    //   params.id = uuidv4();
    // }
    return new DocumentosClipadre(params);
  }
}


export class Documentos {
  public EntityId: number;
  public AgentId:number;
  public ClientId:string;
  public Vendedor:string;
  public NombreEnte:string;
  public NombreAgente:string;
  public Clipadre:string;
  constructor(params: IDocumentos) {
    this.EntityId = params.EntityId;
    this.AgentId = params.AgentId;
    this.ClientId = params.ClientId;
    this.Vendedor = params.Vendedor;
    this.NombreEnte = params.NombreEnte;
    this.NombreAgente = params.NombreAgente;
    this.Clipadre = params.Clipadre;
  }
}

export interface IDocumentos {
  EntityId?:number;
  AgentId?:number;
  ClientId?: string;
  Vendedor?: string;
  NombreEnte?: string;
  NombreAgente?: string;
  Clipadre?: string;
}

import {Creator, Serializable} from '@database/interface';
// import {v4 as uuidv4} from 'uuid';

export class SumarizadaClipadre implements Serializable {
  public Clipadre: string;
  public Cartera:Portfolio;
  public Intervalos:Array<Invervalos>;

  constructor(params: ISumarizadaClipadre) {
    this.Clipadre = params.Clipadre;
    this.Cartera = params.Cartera;
    this.Intervalos = params.Intervalos;
  }

  getKey(): string {
    return this.Clipadre;
  }

  toJSON(): ISumarizadaClipadre {
    return {
      Clipadre:this.Clipadre,
      Cartera:this.Cartera,
      Intervalos:this.Intervalos
    };
  }
}

export interface ISumarizadaClipadre {
  Clipadre?: string;
  Cartera?:Portfolio;
  Intervalos?:Array<Invervalos>;
}

export class SumarizadaClipadreCreator extends Creator<SumarizadaClipadre> {
  factoryMethod(params: ISumarizadaClipadre): SumarizadaClipadre {
    // if(!params.id) {
    //   params.id = uuidv4();
    // }
    return new SumarizadaClipadre(params);
  }
}

export class Portfolio{
  public Cartera: number;
  public Vencida:number;
  public Vence_mes:number;
  public Por_vencer:number;
  public Credito:number;
  constructor(params: IPortfolio) {
    this.Cartera = params.Cartera;
    this.Vencida = params.Vencida;
    this.Vence_mes = params.Vence_mes;
    this.Por_vencer = params.Por_vencer;
    this.Credito = params.Credito;
  }
}
export interface IPortfolio {
  Cartera?:number;
  Vencida?:number;
  Vence_mes?:number;
  Por_vencer?:number;
  Credito?:number;
}

export class Invervalos{
  public Intervalo: string;
  public Valor:number;
  constructor(params: IInvervalos) {
    this.Intervalo = params.Intervalo;
    this.Valor = params.Valor;
  }
}
export interface IInvervalos {
  Intervalo?:string;
  Valor?:number;
}
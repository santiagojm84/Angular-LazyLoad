import {Creator} from '../interface';

export class AgentTQ {
  person: PersonTQ;
  force: ForceTQ;
  modules: Array<IModule>;

  constructor(params: IAgentTQ) {
    this.modules = params.modules || [];
  }

}

export class PersonTQ {
  name: string;
  email: string;
  avatar?: string;

  constructor(params: IPersonTQ) {
    this.name = params.name;
    this.email = params.email;
  }
}

export interface IPersonTQ {
  name: string;
  email: string;
  avatar?: string;
}

export class ForceTQ {
  name: string;
  id: string;
}

export interface IModule {
  name: string;
  slug: string;
  module: string;
  layout: {
    [key: string]: boolean;
  };
  icon?: string;
  route?: string;
  children?: Array<IModule>;
  params?: any;
  claims?: Array<string>;
}


export interface IAgentTQ {
  person: IPersonTQ;
  modules: Array<IModule>;
}

export class PersonTQCreator extends Creator<PersonTQ> {
  factoryMethod(params: IPersonTQ): PersonTQ {
    return new PersonTQ(params);
  }
}

export class AgentTQCreator extends Creator<AgentTQ> {
  factoryMethod(params: IAgentTQ): AgentTQ {
    const creator = new PersonTQCreator();
    const agent = new AgentTQ(params);
    agent.person = creator.factoryMethod(params.person);
    return agent;
  }
}


export interface IModuleGerente {
  name: string;
  slug: string;
  module: string;
  layout: {
    [key: string]: boolean;
  };
  icon?: string;
  route?: string;
  children?: Array<IModule>;
  params?: any;
  claims?: Array<string>;
  estadoPlan:boolean;
  zona:string;
  horasMes: string;
  cumplimiento: string;
  clientesMaestra: string;
  programados:string;
  directos: string;
}

export interface IManagerData{
  agentId:number;
  agentName:string;
  asignados:number;
  cubrimiento:number;
  estadoPlan:boolean;
  horasMes:number;
  id_Source:string;
  planeados:number;
}

export interface IHoursDay{
  horasDia:number;
  dia:string;
  programados:number;
}

export interface IAgentDataResponse{
  agent:IManagerData;
  hoursDays:Array<IHoursDay>;
}
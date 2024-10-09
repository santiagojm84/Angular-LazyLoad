import {Entity} from './entity.class';
import {Creator, Serializable} from '../interface';

export class Router implements Serializable {
  public id: number;
  public agentId: number;
  public entityId: number;
  public entity: Entity;


  constructor(params: IRouter) {
    this.id = params.id;
    this.agentId = params.agentId;
    this.entityId = params.entityId;
  }

  getKey(): number {
    return this.id;
  }

  toJSON(): IRouter {
    return {
      id: this.id,
      agentId: this.agentId,
      entityId: this.entityId
    };
  }
}

export interface IRouter {
  id: number;
  agentId: number;
  entityId: number;
}


export class RouterCreator extends Creator<Router> {
  factoryMethod(params: IRouter): Router {
    return new Router(params);
  }
}

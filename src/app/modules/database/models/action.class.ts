import {ActionType} from './action-type.class';
import {Creator, Serializable} from '../interface';

export class Action implements Serializable {
  public id: number;
  public name: string;
  public idActionType: number;
  public actionType: ActionType;
  public target: string;
  public description: string;
  public idSegmentation?: number;
  public idPlan?: number;
  public required?: string;

  constructor(params: IAction) {
    this.id = params.id_Action;
    this.name = params.name;
    this.idActionType = params.idActionType;
    this.target = params.target;
    this.description = params.description;
    this.idSegmentation = params.idSegmentation;
    this.idPlan = params.idPlan;
    this.required = params.required;
  }

  getKey(): number {
    return this.id;
  }

  toJSON(): IAction {
    return {
      id_Action: this.id,
      name: this.name,
      idActionType: this.idActionType,
      target: this.target,
      description: this.description,
      idSegmentation: this.idSegmentation,
      idPlan: this.idPlan,
      required: this.required
    };
  }
}

export interface IAction {
  id_Action: number;
  name: string;
  idActionType: number;
  target: string;
  description: string;
  idSegmentation?: number;
  idPlan?:number;
  required?:string;
}


export class ActionCreator extends Creator<Action> {
  factoryMethod(params: IAction): Action {
    return new Action(params);
  }
}

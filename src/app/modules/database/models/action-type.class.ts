import {Creator, Serializable} from '../interface';
import {ActionCreator} from './action.class';


export class ActionType implements Serializable {
  id: number;
  name: string;
  actionClass: string;
  subType: string;
  classification: string;
  marking: string;
  focusAFUN: string;

  constructor(params: IActionType) {
    this.id = params.id_TypeAction;
    this.name = params.name_TypeAction;
    this.actionClass = params.actionClass;
    this.subType = params.subType;
    this.classification = params.clasification;
    this.marking = params.marking;
    this.focusAFUN = params.focus_AF_UN;
  }

  getKey(): number {
    return this.id;
  }

  toJSON(): IActionType {
    return {
      id_TypeAction: this.id,
      name_TypeAction: this.name,
      actionClass: this.actionClass,
      subType: this.subType,
      clasification: this.classification,
      marking: this.marking,
      focus_AF_UN: this.focusAFUN
    }
  }
}

export interface IActionType {
  id_TypeAction: number;
  name_TypeAction: string;
  actionClass: string;
  subType: string;
  clasification: string;
  marking: string;
  focus_AF_UN: string;
}


export class ActionTypeCreator extends Creator<ActionType> {
  factoryMethod(params: IActionType): ActionType {
    return new ActionType(params);
  }
}

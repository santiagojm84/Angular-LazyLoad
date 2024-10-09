import {Entity} from './entity.class';
import {Action} from './action.class';
import {Creator, Serializable} from '../interface';

export class Activity implements Serializable {
  public id: number;
  public routerId: number;
  public entity: Entity;
  public cicle: number;
  public executionDate: string;
  public actionId: number;
  public action: Action;
  public isDone: string;
  public sourceId: string;
  public startDate: string;
  public endDate: string;
  public isRequired: string;
  public order: number;
  public estadoSegmentacion: boolean;

  constructor(params: IActivity) {
    this.id = params.id;
    this.routerId = params.routerId;
    this.cicle = params.cicle;
    this.executionDate = params.executionDate;
    this.actionId = params.actionId;
    this.isDone = params.isDone;
    this.sourceId = params.sourceId;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.isRequired = params.isRequired;
    this.order = params.order;
  }

  getKey(): number {
    return this.routerId;
  }

  getItem(): any {
    if (this.entity && this.action) {
      return {
        id: this.id,
        label: this.action.name,
        detail: this.action.description,
        route: this.action?.actionType?.marking ? this.action?.actionType?.marking : undefined,
        completed: !!this.isDone
      };
    }
    return undefined;
  }

  get put(): IActivityPut {
    return {
      id_Planner: this.id,
      id_Route: this.routerId,
      cicle: this.cicle,
      executionDate: (new Date()).toISOString(),
      id_Action: this.actionId,
      isDone: '1',
      beginDate: this.startDate,
      endDate: this.endDate,
      isRequired: this.isRequired,
      order: this.order
    };
  }

  toJSON(): IActivity {
    return {
      id: this.id,
      routerId: this.routerId,
      cicle: this.cicle,
      executionDate: this.executionDate,
      actionId: this.actionId,
      isDone: this.isDone,
      sourceId: this.sourceId,
      startDate: this.startDate,
      endDate: this.endDate,
      isRequired: this.isRequired,
      order: this.order
    };
  }
}

export interface IActivity {
  id: number;
  routerId: number;
  cicle: number;
  executionDate: string;
  actionId: number;
  isDone: string;
  sourceId: string;
  startDate: string;
  endDate: string;
  isRequired: string;
  order: number;
}

export interface IActivityPut {
  id_Planner: number;
  id_Route: number;
  cicle: number;
  executionDate: string;
  id_Action: number;
  isDone: string;
  beginDate: string;
  endDate: string;
  isRequired: string;
  order: number;
}


export class ActivityCreator extends Creator<Activity> {
  factoryMethod(params: IActivity): Activity {
    return new Activity(params);
  }
}

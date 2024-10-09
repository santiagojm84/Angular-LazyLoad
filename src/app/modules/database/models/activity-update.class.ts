import {Creator, Serializable} from '@database/interface';
import {IActivityPut} from '@database/models/activity.class';
import {v4 as uuidv4} from 'uuid';

export class ActivityUpdate implements Serializable {
  public id: string;
  public activity: IActivityPut;

  constructor(params: IActivityUpdate) {
    this.id = params.id;
    this.activity = params.activity;
  }

  getKey(): string {
    return this.id;
  }

  toJSON(): IActivityUpdate {
    return {
      id: this.id,
      activity: this.activity
    };
  }
}

export interface IActivityUpdate {
  id?: string;
  activity: IActivityPut;
}

export class ActivityUpdateCreator extends Creator<ActivityUpdate> {
  factoryMethod(params: IActivityUpdate): ActivityUpdate {
    if(!params.id) {
      params.id = uuidv4();
    }
    return new ActivityUpdate(params);
  }
}

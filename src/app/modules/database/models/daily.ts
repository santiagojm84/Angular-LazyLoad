import { IActivityGroup } from '../../../design-tq/pages/models/objects';

export class DailyPage{
  dashboard: {
    type: string;
    data: any;
  };
  agenda: Array<IActivityGroup>;

  constructor(dashboard, agenda) {
    this.dashboard = dashboard;
    this.agenda = agenda;
  }
}

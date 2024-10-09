import {Injectable} from '@angular/core';
import Daily from '../config/daily.json';
import {DailyPage} from '../../../app/modules/database/models';
import {AgentTQ} from '../../../app/modules/database/models/agent';

@Injectable({
  providedIn: 'root'
})
export class DummyService {

  daily: DailyPage;
  agent!: AgentTQ;

  constructor() {
    this.daily = new DailyPage(Daily.dashboard, Daily.agenda);
    this.daily.dashboard = Daily.dashboard;
    this.daily.agenda = Daily.agenda;
  }
}

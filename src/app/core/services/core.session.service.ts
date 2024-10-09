import { Injectable } from '@angular/core';
import { corepermissionResultState } from '../models/core.permissionResultState'
import { getDBStore, STORES } from '@database/database.const';
import { DatabaseService } from '@database/database.service';
import { AgentIdentity } from '@main/shared/models/agent-identity.class';
import { ApiService } from '../../../modules/ejecucion/services/api.service';
import { CoreTraceSession } from '../models/core.traceSession.';
import { CoreSessionGeneralInfo } from '../models/core.sessionGeneralInfo';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreSessionService {

  currentAgent: any;
  private agentSession = {} as CoreTraceSession;
  private agentSessionGeneralInfo = {} as CoreSessionGeneralInfo;

  /**
   *
   */
  constructor(public database: DatabaseService, protected api: ApiService) { }

  // crear un metodo que retorne la info de session
  // crear un obejto con la información para setear el metodo setSessionInfo

  public async setSessionInfo() {
    //let agentSession = {} as CoreTraceSession;
    let agentInfo = await this.getAgentSessionInfo();
    let usuario = 'consultar el usuario del token' //agentInfo.force.agents.find((agent) => agent.id_Agent === this.currentAgent.id)
    this.agentSession.sessionId = Math.floor(Math.random() * 100000);
    this.agentSession.sessionStartDate = new Date();
    this.agentSession.agentId = agentInfo.id_Agent;
    this.agentSession.forceId = agentInfo.id_Force;
    this.agentSession.usuariored = usuario;
    await this.SetAgentGeneralInfo();
  }

  public async getSessionInfo() {
    let actualagentSession = {} as CoreTraceSession

    if (!this.agentSession.agentId) {
      await this.setSessionInfo();
    }
    actualagentSession = this.agentSession;

    return actualagentSession;
  }

  private async getAgentSessionInfo() {
    try {
      this.currentAgent = await this.api.getCurrentAgent()
      const AgentIdentity = await this.database.obtenerListaObjetoIndexedDB(getDBStore(STORES.AgentIdentity));
      const currentAgentIdentity: AgentIdentity = AgentIdentity.find((agent) => agent.id === this.currentAgent.id)

      return currentAgentIdentity;
    } catch (error) {
      console.error('Error al solicitar permiso', error);
    }
  }

  private async SetAgentGeneralInfo() {
    let entities: any[] = (await this.database.obtenerListaObjetoIndexedDB(getDBStore(STORES.Entity))).map((o) => o.id);
    let actions: any[] = await this.database.obtenerListaObjetoIndexedDB(getDBStore(STORES.Action));
    let planId = actions[0].idPlan ?? environment.totales_plan_id;    

    this.agentSessionGeneralInfo.idAgente = this.agentSession.agentId;
    this.agentSessionGeneralInfo.idFuerza = this.agentSession.forceId;
    this.agentSessionGeneralInfo.idPlan = planId;  
    this.agentSessionGeneralInfo.nombreCampo =  environment.totales_campo_tipo_cli_fact;
    this.agentSessionGeneralInfo.tipoCampo = environment.totales_tipo_campo;
    this.agentSessionGeneralInfo.valorCampo = environment.totales_valor_campo;
    this.agentSessionGeneralInfo.entes = entities;

    const agentSessionInfo = JSON.stringify(this.agentSessionGeneralInfo)
    localStorage.setItem("agentGeneralSessionInfo",agentSessionInfo)
  }  

  public async getAgentGeneralInfo(): Promise<CoreSessionGeneralInfo> {
    !this.agentSessionGeneralInfo ? await this.SetAgentGeneralInfo() : '';
    
    let agentSessionInfo = localStorage.getItem('agentGeneralSessionInfo') || '';
    return JSON.parse(agentSessionInfo)
  }  

}

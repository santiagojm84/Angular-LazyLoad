/* eslint-disable */
import { IDatabase } from './database.interface';

export enum STORES {
  Third,
  Planeacion,
  PlaneacionAnterior,
  Entity,
  Action,
  ActionType,
  Activity,
  Festivos,
  FechasHabiles,
  ActivityUpdate,
  FechaCierre,
  Segmentation,
  Router,
  Document,
  AgentSummary,
  EntitySummary,
  FieldLocation,
  AgentIdentity,
  Metadata,
  EntityDetails,
  GruposCodigoEstadistico,
  VariablesCodigoEstadistico,
  PreguntasCodigoEstadistico,
  RespuestasCodigoEstadistico,
  RespuestasComentarios,
  EncuestasCodigoEstadistico,
  SavePendingData,
  SaveRespuestasCodigoEstadistico,
  SaveEncuestasCodigoEstadistico,
  NuevasEncuestasCodigoEstadistico,

  Prospectos,
  EncuestasProspectosCodigoEstadistico,
  RespuestasProspectosCodigoEstadistico,
  SaveRespuestasProspectosCodigoEstadistico,
  SaveEncuestasProspectosCodigoEstadistico,
  NuevasEncuestasProspectosCodigoEstadistico,
  NuevosProspectos,

  AprobadorCodigoEstadistico,

  SumarizadaClipadre,
  DocumentosClipadre,

  traceError,
}

export const DATABASE: IDatabase = {
  name: 'ProductividadTQ',
  currentVersion: 17,
  stores: [
    {
      id: STORES.Third,
      name: 'Third',
      parameters: {
        keyPath: 'id',
      },
      indexes: [],
    },
    {
      id: STORES.Planeacion,
      name: 'Planeacion',
      parameters: {
        keyPath: 'id',
      },
      indexes: [],
    },
    {
      id: STORES.PlaneacionAnterior,
      name: 'PlaneacionAnterior',
      parameters: {
        keyPath: 'id',
      },
      indexes: [],
    },
    {
      id: STORES.Entity,
      name: 'Entity',
      parameters: {
        keyPath: 'id',
      },
      indexes: [
        {
          key: 'thirdId',
          name: 'Third Id',
        },
      ],
    },
    {
      id: STORES.Action,
      name: 'Action',
      parameters: {
        autoIncrement: false,
        keyPath: 'id_Action',
      },
      indexes: [
        {
          key: 'idPlan',
          name: 'PlanAction',
          parameters: {
            unique: false,
          },
        },
      ],
    },
    {
      id: STORES.ActionType,
      name: 'ActionType',
      parameters: {
        keyPath: 'id_TypeAction',
      },
      indexes: [],
    },
    {
      id: STORES.Activity,
      name: 'Activity',
      parameters: {
        autoIncrement: true,
        keyPath: 'id',
      },
      indexes: [],
    },
    {
      id: STORES.FechaCierre,
      name: 'FechaCierre',
      parameters: {
        autoIncrement: false,
        keyPath: 'id',
      },
      indexes: [],
    },
    {
      id: STORES.Festivos,
      name: 'Festivos',
      parameters: {
        autoIncrement: false,
        keyPath: 'id',
      },
      indexes: [],
    },
    {
      id: STORES.FechasHabiles,
      name: 'FechasHabiles',
      parameters: {
        autoIncrement: true,
        keyPath: 'id',
      },
      indexes: [],
    },
    {
      id: STORES.Segmentation,
      name: 'Segmentation',
      parameters: {
        autoIncrement: false,
        keyPath: 'idSegmentation',
      },
      indexes: [],
    },
    {
      id: STORES.ActivityUpdate,
      name: 'ActivityUpdate',
      parameters: {
        autoIncrement: true,
        keyPath: 'id',
      },
      indexes: [],
    },
    {
      id: STORES.Router,
      name: 'Router',
      parameters: {
        keyPath: 'id',
      },
      indexes: [
        {
          key: 'entityId',
          name: 'EntityId',
        },
      ],
    },
    {
      id: STORES.Document,
      name: 'Document',
      parameters: {
        keyPath: 'id',
      },
      indexes: [
        {
          name: 'Entity',
          key: 'entityId',
        },
        {
          name: 'FatherDocId',
          key: 'fatherDocId',
        },
        {
          name: 'Agent',
          key: 'agentId',
        },
      ],
    },
    {
      id: STORES.AgentSummary,
      name: 'AgentSummary',
      parameters: {
        keyPath: 'idSummaryAgent',
      },
      indexes: [],
    },
    {
      id: STORES.EntitySummary,
      name: 'EntitySummary',
      parameters: {
        keyPath: 'entityId',
      },
      indexes: [],
    },
    {
      id: STORES.FieldLocation,
      name: 'FieldLocation',
      parameters: {
        keyPath: 'idLocation',
      },
      indexes: [],
    },
    {
      id: STORES.AgentIdentity,
      name: 'AgentIdentity',
      parameters: {
        //keyPath: 'id_Agent'
        keyPath: 'id',
      },
      indexes: [
        {
          name: 'Force',
          key: 'id_Force',
        },
        {
          name: 'dataAgent',
          key: 'id',
        },
      ],
    },
    {
      id: STORES.Metadata,
      name: 'Metadata',
      parameters: {
        keyPath: 'id',
      },
      indexes: [],
    },
    {
      id: STORES.EntityDetails,
      name: 'EntityDetails',
      parameters: {
        keyPath: 'id',
      },
      indexes: [],
    },
    {
      id: STORES.GruposCodigoEstadistico,
      name: 'GruposCodigoEstadistico',
      parameters: {
        keyPath: 'Id',
      },
      indexes: [],
    },
    {
      id: STORES.VariablesCodigoEstadistico,
      name: 'VariablesCodigoEstadistico',
      parameters: {
        keyPath: 'Id',
      },
      indexes: [],
    },
    {
      id: STORES.PreguntasCodigoEstadistico,
      name: 'PreguntasCodigoEstadistico',
      parameters: {
        keyPath: 'Id',
      },
      indexes: [],
    },
    {
      id: STORES.RespuestasCodigoEstadistico,
      name: 'RespuestasCodigoEstadistico',
      parameters: {
        keyPath: 'Id',
      },
      indexes: [],
    },
    {
      id: STORES.RespuestasComentarios,
      name: 'RespuestasComentarios',
      parameters: {
        autoIncrement: true,
        keyPath: 'id',
      },
      indexes: [],
    },
    {
      id: STORES.EncuestasCodigoEstadistico,
      name: 'EncuestasCodigoEstadistico',
      parameters: {
        keyPath: 'Id',
      },
      indexes: [],
    },
    {
      id: STORES.SavePendingData,
      name: 'SavePendingData',
      parameters: {
        keyPath: 'id',
      },
      indexes: [],
    },
    {
      id: STORES.SaveRespuestasCodigoEstadistico,
      name: 'SaveRespuestasCodigoEstadistico',
      parameters: {
        keyPath: 'Id',
      },
      indexes: [],
    },
    {
      id: STORES.SaveEncuestasCodigoEstadistico,
      name: 'SaveEncuestasCodigoEstadistico',
      parameters: {
        keyPath: 'Id',
      },
      indexes: [],
    },
    {
      id: STORES.NuevasEncuestasCodigoEstadistico,
      name: 'NuevasEncuestasCodigoEstadistico',
      parameters: {
        keyPath: 'Id',
      },
      indexes: [],
    },
    {
      id: STORES.Prospectos,
      name: 'Prospectos',
      parameters: {
        keyPath: 'guid',
      },
      indexes: [],
    },
    {
      id: STORES.EncuestasProspectosCodigoEstadistico,
      name: 'EncuestasProspectosCodigoEstadistico',
      parameters: {
        keyPath: 'Id',
      },
      indexes: [],
    },
    {
      id: STORES.RespuestasProspectosCodigoEstadistico,
      name: 'RespuestasProspectosCodigoEstadistico',
      parameters: {
        keyPath: 'Id',
      },
      indexes: [],
    },
    {
      id: STORES.SaveRespuestasProspectosCodigoEstadistico,
      name: 'SaveRespuestasProspectosCodigoEstadistico',
      parameters: {
        keyPath: 'Id',
      },
      indexes: [],
    },
    {
      id: STORES.SaveEncuestasProspectosCodigoEstadistico,
      name: 'SaveEncuestasProspectosCodigoEstadistico',
      parameters: {
        keyPath: 'Id',
      },
      indexes: [],
    },
    {
      id: STORES.NuevasEncuestasProspectosCodigoEstadistico,
      name: 'NuevasEncuestasProspectosCodigoEstadistico',
      parameters: {
        keyPath: 'Id',
      },
      indexes: [],
    },
    {
      id: STORES.NuevosProspectos,
      name: 'NuevosProspectos',
      parameters: {
        keyPath: 'guid',
      },
      indexes: [],
    },
    {
      id: STORES.AprobadorCodigoEstadistico,
      name: 'AprobadorCodigoEstadistico',
      parameters: {
        keyPath: 'Id',
      },
      indexes: [],
    },
    {
      id: STORES.SumarizadaClipadre,
      name: 'SumarizadaClipadre',
      parameters: {
        keyPath: 'Clipadre',
      },
      indexes: [],
    },
    {
      id: STORES.DocumentosClipadre,
      name: 'DocumentosClipadre',
      parameters: {
        keyPath: 'Clipadre',
      },
      indexes: [],
    },
    {
      id: STORES.traceError,
      name: 'traceError',
      parameters: {
        keyPath: 'eventId',
      },
      indexes: [],
    },
  ],
};

export function getDBStore(store: STORES): string {
  return DATABASE.stores.find((s) => s.id === store)?.name || undefined;
}

export interface IEnvironment {
  production: boolean;
  role: string;
  OidcClientSettings: {
    authority: string;
    client_id: string;
    scope: string;
    silentRenew: boolean;
    renewTimeBeforeTokenExpiresInSeconds: number;
  };
  apiGateway: string;
  local: boolean;
  pwa: boolean;
  training: string;
  version: string;
  phoneNumber: string;
  idCampoNomClipadre: string;
  sucClipadre: string;
  idCupoClipadre: string;
  idsEncuestas: string;
  nuevasVisitasMaxPlaneacion: string;
  nuevasVisitasMaxEjecucion: string;
  terceronombre: string;
  terceroid: string;
  terceroclase: string;
  terceroquintil_rs: string;
  tercerodireccion: string;
  tercerotelefono: string;
  tercerofrecuencia_visita: string;
  tercerocupo_disponible: string;
  tercerofecha_ultima_visita: string;
  tercerocompromiso: string;
  tercerocliente: string;
  tercerocodigo_compania: string;
  tercerorazon_social: string;
  tercerociudad: string;
  tercerobarrio: string;
  terceroemail: string;
  terceronit: string;
  terceroclipadre: string;
  tercerocelular: string;
  tercerointeres: string;
  terceroplazo: string;
  terceroplazo_interno_especial: string;
  terceroflag_interes: string;
  terceroestado: string;
  terceroemail_fec: string;
  tercerotitulo_info_cliente: string;
  tercerotitulo_info_admin_cliente: string;
  tercerotitulo_info_admin_det_cliente: string;
  tercerotitulo_info_admin_basica: string;
  tercerotitulo_info_admin_cartera: string;
  terceronom_clipadre: string;
  tercerosuc_clipadre: string;
  terceroduracion_visita: string;
  tercerotipo_cli_facturacion: string;
  tipo_Cubrimiento: string;
  tipo_Colocacion: string;
  totales_campo_tipo_cli_fact: string;
  totales_tipo_campo: string;
  totales_valor_campo: string;
  totales_plan_id: string;
  powerBi: {
    workspaceId: string;
    reportId: string;
  };
  baseUri: string;
  postLogoutRedirectUri: string;
  limiteHoraAccion: string;
  idQuota: string
}

export const versionTest = '0.2.7';
export const versionProd = '1.0.0';

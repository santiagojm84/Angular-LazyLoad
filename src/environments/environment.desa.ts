import { IEnvironment, versionTest } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  role: 'Claim_ec',
  OidcClientSettings: {
    authority: '#{authority}#',
    client_id: '#{client_id}#',
    scope: '#{scope}#',
    silentRenew: true,
    renewTimeBeforeTokenExpiresInSeconds: 300,
  },
  //apiGateway: 'https://localhost:44370',
  apiGateway: '#{apiGateway}#',
  local: false,
  pwa: true,
  training: '#{training}#',
  version: versionTest,
  phoneNumber: '#{config.telefono}#',
  idCampoNomClipadre: '#{config.idCampoNomClipadre}#',
  sucClipadre: '#{config.sucClipadre}#',
  idCupoClipadre: '#{config.idCupoClipadre}#',
  idsEncuestas: '#{config.idsEncuestas}#',
  nuevasVisitasMaxPlaneacion: '#{config.nuevasVisitasMaxPlaneacion}#',
  nuevasVisitasMaxEjecucion: '#{config.nuevasVisitasMaxEjecucion}#',
  terceronombre: '#{tercero.nombre}#',
  terceroid: '#{tercero.id}#',
  terceroclase: '#{tercero.clase}#',
  terceroquintil_rs: '#{tercero.quintil_rs}#',
  tercerodireccion: '#{tercero.direccion}#',
  tercerotelefono: '#{tercero.telefono}#',
  tercerofrecuencia_visita: '#{tercero.frecuencia_visita}#',
  tercerocupo_disponible: '#{tercero.cupo_disponible}#',
  tercerofecha_ultima_visita: '#{tercero.fecha_ultima_visita}#',
  tercerocompromiso: '#{tercero.compromiso}#',
  tercerocliente: '#{tercero.cliente}#',
  tercerocodigo_compania: '#{tercero.codigo_compania}#',
  tercerorazon_social: '#{tercero.razon_social}#',
  tercerociudad: '#{tercero.ciudad}#',
  tercerobarrio: '#{tercero.barrio}#',
  terceroemail: '#{tercero.email}#',
  terceronit: '#{tercero.nit}#',
  terceroclipadre: '#{tercero.clipadre}#',
  tercerocelular: '#{tercero.celular}#',
  tercerointeres: '#{tercero.interes}#',
  terceroplazo: '#{tercero.plazo}#',
  terceroplazo_interno_especial: '#{tercero.plazo_interno_especial}#',
  terceroflag_interes: '#{tercero.flag_interes}#',
  terceroestado: '#{tercero.estado}#',
  terceroemail_fec: '#{tercero.email_fec}#',
  tercerotitulo_info_cliente: '#{tercero.titulo_info_cliente}#',
  tercerotitulo_info_admin_cliente: '#{tercero.titulo_info_admin_cliente}#',
  tercerotitulo_info_admin_det_cliente:'#{tercero.titulo_info_admin_det_cliente}#',
  tercerotitulo_info_admin_basica: '#{tercero.titulo_info_admin_basica}#',
  tercerotitulo_info_admin_cartera: '#{tercero.titulo_info_admin_cartera}#',
  terceronom_clipadre: '#{tercero.nom_clipadre}#',
  tercerosuc_clipadre: '#{tercero.suc_clipadre}#',
  terceroduracion_visita: '#{tercero.duracion_visita}#',
  tercerotipo_cli_facturacion: '#{tercero.tipo_cli_facturacion}#',
  tipo_Cubrimiento: '#{tercero.cubrimiento}#',
  tipo_Colocacion: '#{tercero.colocacion}#',
  totales_campo_tipo_cli_fact: '#{total.campo_tipo_cli_fact}#',
  totales_tipo_campo: '#{total.tipo_campo}#',
  totales_valor_campo: '#{total.valor_campo}#',
  totales_plan_id: '#{total.plan_id}#',
  powerBi: {
    workspaceId: '#{workspaceId}#',
    reportId: '#{reportId}#'
  },
  baseUri:'#{baseUri}#',
  postLogoutRedirectUri: '#{postLogoutRedirectUri}#',
  limiteHoraAccion: '#{actionLimitHour}#',
  idQuota: "#{IdQuota}#"
};
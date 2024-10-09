import { getDBStore, STORES } from '@database/database.const';
import { DatabaseService } from '@database/database.service';
import { isEqual } from 'date-fns';
import { unwatchFile } from 'fs';
import moment from 'moment';
import { cteClientes } from 'src/modules/planeacion/constantes/constanes_planeacion';
import { cteVisitas } from 'src/modules/planeacion/constantes/constantes_visitas';
import { ClientesInterface } from '../Interfaces/cliente.interface';
import { EstadosCarteraInterface } from '../Interfaces/estadosCartera.interface';
import { EstadosSemanasInterface } from '../Interfaces/estadosSemana.interface';
import { MetaDataCliente } from '../Interfaces/metaDataCliente.interface';
import { VisitasInterface } from '../Interfaces/visitas.interface';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';


export class ClientesServices {
  static async compararFechas(fechaA: Date, fechaB: Date) {
    if (
      fechaA.getDate() == fechaB.getDate() &&
      fechaA.getMonth() == fechaB.getMonth() &&
      fechaA.getFullYear() == fechaB.getFullYear()
    ) {
      return true;
    } else {
      return false;
    }
  }

  static async validarFechaHabil(db: DatabaseService) {
    var lsFechasHabiles = await db.obtenerListaObjetoIndexedDB(
      getDBStore(STORES.FechasHabiles)
    );
    var fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0);
    var estado = false;
    if (lsFechasHabiles?.length > 0) {
      for (let index = 0; index < lsFechasHabiles.length; index++) {
        var result = await ClientesServices.compararFechas(
          lsFechasHabiles[index].fecha,
          fechaHoy
        );
        if (result == true) {
          estado = true;
          index = lsFechasHabiles.length;
        }
      }
    }
    if (estado == false)
      throw 'Solo se permiten planear visitas en los 3 primeros días hábiles del plan';
  }

  static async agregarFechasHabiles(
    fechasCierre: any,
    festivos: any,
    db: DatabaseService,
    estadoFestivos: boolean
  ) {
    await db.eliminarDatosTablaIndexedDB(getDBStore(STORES.FechasHabiles));
    const dias = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ];
    if (fechasCierre == null || fechasCierre == undefined) return null;
    fechasCierre = fechasCierre?.length > 0 ? fechasCierre[0] : fechasCierre;
    //Obtener fecha de arranque
    var obtenerFechaInicio = new Date(fechasCierre?.startDate);
    obtenerFechaInicio.setHours(0, 0, 0);
    //Días
    var cantidadDias = 3;
    //Lista para las nuevas fechas habiles para planear
    var nuevasFechas = [];
    //Recorre 3 que son los días habiles
    for (let index = 0; index < cantidadDias; index++) {
      var diaSiguiente = new Date(obtenerFechaInicio);
      diaSiguiente.setHours(0, 0, 0);
      //Obtener el texto del día
      var nombreDia = dias[diaSiguiente.getDay()];
      //Saber si es festivo o no
      var obtenerFestivo = festivos.find((a) => {
        var diaFestivo = new Date(a.holyDay);
        diaFestivo.setHours(0, 0, 0);
        if (diaFestivo.getTime() == diaSiguiente.getTime()) return a;
      });
      if (nombreDia == 'domingo' || obtenerFestivo != undefined) cantidadDias++;
      if (estadoFestivos == true && obtenerFestivo != undefined) cantidadDias--;
      //Guardar la fecha
      nuevasFechas.push({
        fecha: diaSiguiente,
      });
      //Aumentar la fecha de inicio en un día
      obtenerFechaInicio.setDate(obtenerFechaInicio.getDate() + 1);
    }
    if (nuevasFechas.length > 0)
      await db.agregarListaObjectoIndexedDB(
        getDBStore(STORES.FechasHabiles),
        nuevasFechas
      );
  }

  static filtrarClientes(
    clientes: Array<ClientesInterface>,
    lsestado: Array<any>,
    lsquintil: Array<any>,
    lsCartera: Array<any>,
    lsEstadoFactura: Array<any>,
    lsSemanas: Array<any>,
    lsCubrimiento: Array<any>,
    lsColocacion: Array<any>,
  ) {
    if (lsestado.length > 0) {
      clientes = clientes.filter((el) => {
        return lsestado.some((f) => {
          return f.id === el.estado;
        });
      });
    }
    if (lsquintil.length > 0) {
      clientes = clientes.filter((el) => {
        return lsquintil.some((f) => {
          return f.id === el.quintil;
        });
      });
    }
    if (lsCartera.length > 0) {
      clientes = clientes.filter((el) => {
        return lsCartera.some((car) => {
          return el.listaEstadosCartera.some((a) => a.id == car.id);
        });
      });
      clientes = clientes.filter((a) => a.listaEstadosCartera.length > 0);
    }

    if (lsEstadoFactura.length > 0) {
      clientes = clientes.filter((el) => {
        return lsEstadoFactura.some((car) => {
          // return el.ListaestadoFacturacion.some((a) => a.id == car.id);
          return car.id === el.estadoFactura;
        });
      });
      // clientes = clientes.filter((a) => a.ListaestadoFacturacion.length > 0);
    }

    if (lsSemanas.length > 0) {
      clientes = clientes.filter((el) => {
        return lsSemanas.some((car) => {
          return el.listaEstadosSemana.some((a) => a.id == car.id);
        });
      });
      clientes = clientes.filter((a) => a.listaEstadosSemana.length > 0);
    }


    if (lsCubrimiento.length > 0) {
      clientes = clientes.filter((el) => {
        return lsCubrimiento.some((car) => {
          return car.id === el.cubrimiento;
        });
      });
    }
    if (lsColocacion.length > 0) {
      clientes = clientes.filter((el) => {
        return lsColocacion.some((car) => {
          return car.id === el.colocacion;
        });
      });
    }
    return clientes;
  }
  static agruparClientes(
    clientes: Array<ClientesInterface>,
    tipo: string,
    orden: string
  ) {
    if (clientes == null || clientes.length == 0) return [];
    var lsobjeto = [];
    var id = 0;
    //Ciudad
    if (tipo == 'ciudad') {
      clientes.forEach((element) => {
        var existe = lsobjeto.find((a) => a.nombre == element.nombreCiudad);
        if (existe == undefined) {
          lsobjeto.push({
            id: id + 1,
            nombre: element.nombreCiudad,
            cliente: [element],
          });
        } else {
          existe.cliente.push(Object.assign(element));
        }
      });
    }
    if (tipo == 'barrio') {
      clientes.forEach((element) => {
        var barrio = element.nombreBarrio + ' - ' + element.nombreCiudad;
        var existe = lsobjeto.find((a) => a.nombre == barrio);
        if (existe == undefined) {
          lsobjeto.push({
            id: id + 1,
            nombre: barrio,
            cliente: [element],
          });
        } else {
          existe.cliente.push(Object.assign(element));
        }
      });
    }
    if (tipo == 'quintil') {
      let id = 0;
      clientes
        .sort((a, b) => {
          if (tipo == 'quintil') {
            if (orden == 'mayor') return a.idQuintil < b.idQuintil ? 1 : -1;
            if (orden == 'menor') return a.idQuintil > b.idQuintil ? 1 : -1;
          }
        })
        .forEach((element) => {
          var existe = lsobjeto.find((a) => a.nombre == element.quintil);
          if (existe == undefined) {
            id++;
            lsobjeto.push({
              id: id,
              nombre: element.quintil,
              cliente: [element],
            });
          } else {
            existe.cliente.push(Object.assign(element));
          }
        });
    }
    lsobjeto.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
    if (tipo == 'quintil') {
      lsobjeto.sort((a, b) => (a.id > b.id ? 1 : -1));
    }
    if (orden == 'mayor') {
      lsobjeto.forEach((element) => {
        element.cliente.sort((a, b) => {
          if (a.idQuintil == b.idQuintil) {
            return a.nombre > b.nombre ? 1 : -1;
          }
          return a.idQuintil < b.idQuintil ? 1 : -1;
        });
        // element.cliente.sort((a, b) => (a.idQuintil < b.idQuintil)? 1 : -1);
      });
    }
    if (orden == 'menor') {
      lsobjeto.forEach((element) => {
        element.cliente.sort((a, b) => {
          if (a.idQuintil == b.idQuintil) {
            return a.nombre > b.nombre ? 1 : -1;
          }
          return a.idQuintil > b.idQuintil ? 1 : -1;
        });
        // element.cliente.sort((a, b) => (a.idQuintil > b.idQuintil)? 1 : -1);
      });
    }
    return lsobjeto;
  }
  compare(a, b) {
    if (a.idQuintil < b.idQuintil) {
      return -1;
    }
    if (a.idQuintil > b.idQuintil) {
      return 1;
    }
    return 0;
  }

  static validarFechaCliente(
    visita: any,
    listaVisita: any,
    tipo: any,
    fechaSeleccionada: Date
  ): boolean {
    var estado: boolean = false;
    if (tipo == 'lista') {
      var validarFecha = listaVisita.visitas.find(
        (a) =>
          a.activo == false &&
          new Date(a.visitDate).setHours(0, 0, 0, 0) ==
          new Date(fechaSeleccionada).setHours(0, 0, 0, 0) &&
          a.visitDate != null
      );
      if (validarFecha != undefined || validarFecha != null) {
        return true;
      }
    } else {
      if (
        new Date(visita.visitDate).setHours(0, 0, 0, 0) ==
        new Date(fechaSeleccionada).setHours(0, 0, 0, 0)
      ) {
        return true;
      }
    }
    return estado;
  }
  static obtenerVisitasTotales(clientes: Array<ClientesInterface>) {
    var objeto = {
      visitasTotales: 0,
      visitasProgramadas: 0,
    };
    if (clientes == null) return objeto;
    clientes.forEach((element) => {
      var lsVisitas = element?.visitas?.filter((a) => a.cicloAnterior == false);
      var cantidad = lsVisitas != null ? lsVisitas.length : 0;
      objeto.visitasTotales = objeto.visitasTotales + cantidad; // element.visitas.length;
      objeto.visitasProgramadas =
        objeto.visitasProgramadas +
        lsVisitas?.filter((a) => a.visitDate != null).length;
    });
    return objeto;
  }
  static validarFechasCiclo(
    fechaSeleccion: Date,
    diaInicioCierre: Date,
    diaCierre: Date
  ) {
    var fechaSeleccionada = moment(fechaSeleccion);
    var inicio = moment(diaInicioCierre);
    var cierre = moment(diaCierre);
    var diffInicio = Math.round(inicio.diff(fechaSeleccionada, 'days', true));
    var diffFin = Math.round(cierre.diff(fechaSeleccionada, 'days', true));
    if (isNaN(diffInicio) || isNaN(diffFin))
      throw 'Es obligatorio las fechas de cierre, comuniquese con un administrador';
    if (diffInicio > 0)
      throw (
        'No se puede asignar por debajo del cierre ' +
        moment(diaInicioCierre).format('L')
      );
    if (diffFin < 0)
      throw (
        'No se puede asignar por debajo del cierre ' +
        moment(diaCierre).format('L')
      );
  }
  static async obtenerEstadoPlan(db: DatabaseService) {
    const lsAgentIdentity = await db.obtenerListaObjetoIndexedDB(
      getDBStore(STORES.AgentIdentity)
    );
    const agentIdentity = lsAgentIdentity?.find((a) => a.current == true);
    return agentIdentity?.savedPlan;
  }
  static async canSendPlan(db: DatabaseService) {
    let isPlanSaved = await this.obtenerEstadoPlan(db);
    try {
      await ClientesServices.validarFechaHabil(db);
      return true;
    } catch (error) {
      return !isPlanSaved;
    }
  }
  static async obtenerMetaDataCliente(
    lsClienteOrganizado: ClientesInterface[]
  ) {
    if (
      lsClienteOrganizado == null ||
      lsClienteOrganizado == undefined ||
      lsClienteOrganizado.length == 0
    )
      return null;
    var metaData: MetaDataCliente = new MetaDataCliente();
    var cliente = lsClienteOrganizado?.[0];
    var visita = cliente?.visitas?.[0];
    metaData.idPlan = visita?.idPlan;
    metaData.commentManager = visita?.commentManager;
    metaData.existeComentario = visita?.commentManager != null ? true : false;
    metaData.SavedPlanDate =
      visita?.SavedPlanDate != null ? visita?.SavedPlanDate : null;
    return metaData;
  }
  static async obtenerClientesIndexDBMesAnterior(db: DatabaseService) {
    var data = await db.obtenerListaObjetoIndexedDB(
      getDBStore(STORES.PlaneacionAnterior)
    );
    data = data?.filter((a) => a.cicloAnterior == true);
    return data;
  }

  static organizarClientes(clientes: any, anterior: boolean = false) {
    if (clientes != null) {
      var duracionDefault = 1;
      var clientesOrganizados: Array<ClientesInterface> =
        new Array<ClientesInterface>();
      var nombrefield = clientes.thirds?.[0]?.fields.find(
        (a) => a.id == environment.terceronombre /* 1 */
      );
      var codigoEstadisticofield = clientes.thirds?.[0]?.fields.find(
        (a) => a.id == environment.terceroid /* 2 */
      );
      var quintilfield = clientes.thirds?.[0]?.fields.find(
        (a) => a.id == environment.terceroquintil_rs /* 4 */
      );
      var codigofield = clientes.thirds?.[0]?.fields.find(
        (a) => a.id == environment.tercerocliente /* 11 */
      );
      var cantidadVisitasfield = clientes.thirds?.[0]?.fields.find(
        (a) => a.id == environment.tercerofrecuencia_visita /* 7 */
      );
      var nombreCiudadfield = clientes.thirds?.[0]?.fields.find(
        (a) => a.id == environment.tercerociudad /* 14 */
      );
      var nombreBarriofield = clientes.thirds?.[0]?.fields.find(
        (a) => a.id == environment.tercerobarrio /* 15 */
      );

      var cupoDisponiblefield = clientes.thirds?.[0]?.fields.find(
        (a) => a.id == environment.tercerocupo_disponible /* 8 */
      );
      var clasefield = clientes.thirds?.[0]?.fields.find(
        (a) => a.id == environment.terceroclase /* 3 */
      );
      var direccionfield = clientes.thirds?.[0]?.fields.find(
        (a) => a.id == environment.tercerodireccion /* 5 */
      );
      var telefonofield = clientes.thirds?.[0]?.fields.find(
        (a) => a.id == environment.tercerotelefono /* 6 */
      );
      var frecuenciafield = clientes.thirds?.[0]?.fields.find(
        (a) => a.id == environment.tercerofrecuencia_visita /* 7 */
      );
      var tipoFacturacionfield = clientes.thirds?.[0]?.fields.find(
        (a) => a.id == environment.tercerotipo_cli_facturacion //36
      );
      var tipoCubrimientofield = clientes.thirds?.[0]?.fields.find(
        (a) => a.id == environment.tipo_Cubrimiento //37
      );
      var tipoColocacionfield = clientes.thirds?.[0]?.fields.find(
        (a) => a.id == environment.tipo_Colocacion //38
      );

      clientes.entities?.forEach((element) => {
        var nombre = element.entityData.find(
          (a) =>
            a.id ==
            (nombrefield != undefined
              ? nombrefield.id
              : environment.terceronombre) /*1*/
        );
        var codigoEstadistico = element.entityData.find(
          (a) =>
            a.id ==
            (codigoEstadisticofield != undefined
              ? codigoEstadisticofield.id
              : environment.terceroid) /*2*/
        );
        var quintil = element.entityData.find(
          (a) =>
            a.id ==
            (quintilfield != undefined
              ? quintilfield.id
              : environment.terceroquintil_rs) /*4*/
        );
        var codigo = element.entityData.find(
          (a) =>
            a.id ==
            (codigofield != undefined
              ? codigofield.id
              : environment.tercerocliente) /*11*/
        );
        var duracion = element.entityData.find(
          (a) => a.id == environment.terceroduracion_visita /*33*/
        )?.value;
        var nombreCiudad = element.entityData.find(
          (a) =>
            a.id ==
            (nombreCiudadfield != undefined
              ? nombreCiudadfield.id
              : environment.tercerociudad) /*14*/
        )?.value;
        var nombreBarrio = element.entityData.find(
          (a) =>
            a.id ==
            (nombreBarriofield != undefined
              ? nombreBarriofield.id
              : environment.tercerobarrio) /*15*/
        )?.value;
        var cupoDisponible = element.entityData.find(
          (a) =>
            a.id ==
            (cupoDisponiblefield != undefined
              ? cupoDisponiblefield.id
              : environment.tercerocupo_disponible) /*8*/
        )?.value;
        var clase = element.entityData.find(
          (a) =>
            a.id ==
            (clasefield != undefined
              ? clasefield.id
              : environment.terceroclase) /*3*/
        )?.value;
        var direccion = element.entityData.find(
          (a) =>
            a.id ==
            (direccionfield != undefined
              ? direccionfield.id
              : environment.tercerodireccion) /*5*/
        )?.value;
        var telefono = element.entityData.find(
          (a) =>
            a.id ==
            (telefonofield != undefined
              ? telefonofield.id
              : environment.tercerotelefono) /*6*/
        )?.value;
        var frecuencia = element.entityData.find(
          (a) =>
            a.id ==
            (frecuenciafield != undefined
              ? frecuenciafield.id
              : environment.tercerofrecuencia_visita) /*7*/
        )?.value;
        duracion = duracion == undefined ? duracionDefault : duracion;

        var estadoFactura = element.entityData.find(
          (a) =>
            a.id ==
            (tipoFacturacionfield != undefined
              ? tipoFacturacionfield.id
              : environment.tercerotipo_cli_facturacion) /*36*/
        );
        var estadoSemanas = element.entityData.find(
          (a) =>
            a.id ==
            (tipoFacturacionfield != undefined
              ? tipoFacturacionfield.id
              : environment.tercerotipo_cli_facturacion) /*36*/
        );

        var cubrimiento = element.entityData.find(
          (a) =>
            a.id ==
            (tipoCubrimientofield != undefined
              ? tipoCubrimientofield.id
              : environment.tipo_Cubrimiento) /*37*/
        );

        var colocacion = element.entityData.find(
          (a) =>
            a.id ==
            (tipoColocacionfield != undefined
              ? tipoColocacionfield.id
              : environment.tipo_Colocacion) /*38*/
        );

        var cantidad = new Array<VisitasInterface>();
        element.entityVisits?.forEach((visita) => {
          //Horas
          var horafin = null;
          var horainicio = null;
          var fecha =
            visita.visitDate != null ? new Date(visita.visitDate) : null;
          if (fecha != null) {
            fecha.setHours(0, 0, 0);
            horafin = new Date(
              fecha.setHours(duracion != null ? duracion : duracionDefault)
            );
            horainicio = new Date(fecha.setHours(0, 0, 0));
          }
          cantidad.push(
            Object.assign({
              id: visita.id,
              visitDate: visita.visitDate != null ? visita.visitDate : null,
              activo: false,
              visit_Duration: duracion,
              fechaFin: horafin,
              fechaInicio: horainicio,
              idPlan: visita.idPlan,
              state:
                visita.state != null
                  ? cteVisitas.obtenerTexo(visita.state)
                  : cteVisitas.porIniciar,
              gpsInitLat: visita.gpsInitLat,
              gpsInitLng: visita.gpsInitLng,
              gpsFinishLat: visita.gpsFinishLat,
              gpsFinishLng: visita.gpsFinishLng,
              commentAction: visita?.commentAction,
              commentVisit: visita?.commentVisit,
              savedPlan: visita?.savedPlan,
              cicloAnterior: anterior,
              description: visita?.description,
              commentManager: visita?.commentManager,
              visita_nueva: visita?.visitaNueva,
              sugeria_ant: visita?.sugeridaAnt,
              Estado_Sugeria: visita?.estado_Sugeria,
            })
          );
        });
        var lsEstadoCartera: Array<EstadosCarteraInterface>;
        lsEstadoCartera = new Array<EstadosCarteraInterface>();

        var lsSemanas: Array<EstadosSemanasInterface>;
        lsSemanas = new Array<EstadosSemanasInterface>();
        var etiqueta = false;

        if (element?.portfolioStatus == null) {
          lsEstadoCartera.push(
            Object.assign({
              id: cteClientes.cuentaCorriente,
              entityId: 0,
              status: 'corriente',
              value: 0,
            })
          );

          lsSemanas.push(
            Object.assign({
              id: 0,
              entityId: 0,
              statussema: '',
              valuesema: '',
            })
          );
        } else {
          var entityId = element?.portfolioStatus?.entityId;
          element?.portfolioStatus?.estadosCartera?.forEach((status) => {
            if (etiqueta == false)
              etiqueta = status.status == 'Vencida' ? true : false;

            lsEstadoCartera.push(
              Object.assign({
                id:
                  status.status == 'Vencida'
                    ? cteClientes.vencida
                    : status.status == 'PorVencerMayor30'
                      ? cteClientes.PorVencerMayor30
                      : status.status == 'PorVencerMenor30'
                        ? cteClientes.PorVencerMenor30
                        : 0,
                entityId: entityId,
                status: status.status,
                value: status.value,
              })
            );
          }),

            element?.portfolioStatus?.estadoSemana?.forEach((statuss) => {

              lsSemanas.push(
                Object.assign({
                  id:
                    statuss.statussema == 'semana_1'
                      ? 'semana_1' //cteClientes.S1
                      : statuss.statussema == 'semana_2'
                        ? 'semana_2' //cteClientes.S2
                        : statuss.statussema == 'semana_3'
                          ? 'semana_3' //cteClientes.S3
                          : statuss.statussema == 'semana_4'
                            ? 'semana_4' //cteClientes.S4
                            : statuss.statussema == 'semana_5'
                              ? 'semana_5' //cteClientes.S5
                              : 'sin semana',


                  entityId: entityId,
                  // id: statuss.statussema,
                  statussema: statuss.statussema,
                  valuesema: statuss.valuesema,
                })
              );
            }

            )

        }
        clientesOrganizados.push(
          Object.assign({
            id: element.id,
            nombre:
              nombre != undefined ? this.quitarTildes(nombre.value) : 'N/N',
            quintil:
              quintil != undefined && quintil != '' && quintil?.value != ''
                ? quintil.value
                : 'sin seg',
            cubrimiento:
              cubrimiento != undefined && cubrimiento != '' && cubrimiento?.value != ''
                ? cubrimiento.value
                : 'Sin cubrimiento',
            colocacion:
              colocacion != undefined && colocacion != '' //&& colocacion?.value != ''
                ? colocacion.value == 'X'
                  ? colocacion.value
                  : colocacion.value == ''
                : 'colocacion',
            codigo: codigo != undefined ? codigo.value : 'N/N',
            activo: false,
            codigoEstadistico:
              codigoEstadistico != undefined ? codigoEstadistico.value : null,
            cantidad: element.entityVisits?.length,
            cantidadesAsignadas: element.entityVisits?.filter(
              (a) => a.visitDate != null
            ).length,
            estado:
              element.entityVisits?.filter((a) => a.visitDate != null).length ==
                0
                ? cteClientes.sinVisita
                : element.entityVisits?.filter((a) => a.visitDate != null)
                  .length < element.entityVisits?.length
                  ? cteClientes.parcial
                  : element.entityVisits?.filter((a) => a.visitDate != null)
                    .length == element.entityVisits?.length
                    ? cteClientes.programado
                    : null,
            visitas: cantidad,
            nombreCiudad: nombreCiudad,
            nombreBarrio: nombreBarrio,
            cupoDisponible: cupoDisponible,
            clase: clase,
            cicloAnterior: anterior,
            direccion: direccion,
            telefono: telefono,
            etiquetaVencida: etiqueta,
            frecuenciaVisita: frecuencia,
            listaEstadosCartera: lsEstadoCartera,
            listaEstadosSemana: lsSemanas,
            duracion: duracion != undefined ? duracion : duracionDefault,

            estadoFactura:
              estadoFactura != undefined &&
                estadoFactura != '' &&
                estadoFactura?.value != ''
                ? estadoFactura.value
                : 'sin fact',

            estadoSemanas:
              estadoSemanas != undefined &&
                estadoSemanas != '' &&
                estadoSemanas?.value != ''
                ? estadoSemanas.value
                : 'sin Semanas',

            idCubrimiento:
              cubrimiento != undefined &&
                cubrimiento != '' &&
                cubrimiento.value != ''
                ? cubrimiento.value
                : 'cubrimiento',

            idColocacion:
              colocacion != undefined &&
                colocacion != '' //&& colocacion.value != ''
                ? colocacion.value == 'X'
                  ? cteClientes.sincolocacion
                  : colocacion.value == ''
                : cteClientes.colocacion,


            idEstadoFactura:
              estadoFactura != undefined &&
                estadoFactura != '' &&
                estadoFactura?.value != ''
                ? estadoFactura.value == '1'
                  ? cteClientes.Indirectos
                  : estadoFactura.value == '0'
                : cteClientes.Directos,


            idEstadoSemanas:
              estadoSemanas != undefined
                ? estadoSemanas.statussema == 'semana_1'
                  ? 'semana_1'
                  : estadoSemanas.statussema == 'semana_2'
                    ? 'semana_2'
                    : estadoSemanas.statussema == 'semana_3'
                      ? 'semana_3'
                      : estadoSemanas.statussema == 'semana_4'
                        ? 'semana_4'
                        : estadoSemanas.statussema == 'semana_5'
                : 'semana_5',

            idQuintil:
              quintil != undefined
                ? quintil.value == 'CS2'
                  ? cteClientes.CS2
                  : quintil.value == 'CS1'
                    ? cteClientes.CS1
                    : quintil.value == 'Q5'
                      ? cteClientes.Q5
                      : quintil.value == 'Q4'
                        ? cteClientes.Q4
                        : quintil.value == 'Q3'
                          ? cteClientes.Q3
                          : quintil.value == 'Q2'
                            ? cteClientes.Q2
                            : quintil.value == 'Q1'
                              ? cteClientes.Q1
                              : cteClientes.SIN_QUINTIL
                : 1,
          })
        );
      });
      return clientesOrganizados;
    }
    return null;
  }
  static quitarTildes(cadena) {
    return cadena.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  static async validarFestivos(
    db: DatabaseService,
    fechaSeleccion: Date) {
    var estado = false;
    var lsFestivos = [];

    lsFestivos = await db.obtenerListaObjetoIndexedDB(getDBStore(STORES.Festivos)).then(data => { return data; }).catch((err) => {
      throw new Error(err);
    });

    if (lsFestivos?.length > 0) {
      var dFechaSeleccion = new Date(fechaSeleccion);
      dFechaSeleccion.setHours(0, 0, 0);

      var obtenerFestivo = lsFestivos.find((a) => {
        var diaFestivo = new Date(a.holyDay);
        diaFestivo.setHours(0, 0, 0);
        if (diaFestivo.getTime() == dFechaSeleccion.getTime()) estado = true;
      });
    }
    if (estado)
      throw 'No se permite asignar en un día festivo';
  }
  static obtenerInfoQuintil(clientes: Array<ClientesInterface>, tipoInfo: string) {
    var objeto = [];
    var contVisitas = 0;
    var contClientes = 0;
    var contProgramadas = 0;

    if (clientes == null) return objeto;

    var quintiles = Object.values(clientes.reduce((grupos, item) => {
      if (!grupos[item.quintil]) {
        grupos[item.quintil] = [];
      }
      grupos[item.quintil].push(item);
      return grupos;
    }, {}));

    quintiles.forEach(quintil => {
      var clientesquintil = clientes.filter(x => x.quintil == quintil[0].quintil);
      if (tipoInfo == "visitas") {
        clientesquintil.forEach(element => {
          var lsVisitas = element?.visitas?.filter((a) => a.cicloAnterior == false);
          var cantidad = lsVisitas != null ? lsVisitas.length : 0;
          var programadas = lsVisitas?.filter((a) => a.visitDate != null).length;

          contVisitas = contVisitas + cantidad;
          contProgramadas = contProgramadas + programadas;
        });

        objeto.push(
          {
            "quintil": quintil[0].quintil,
            "visitasTotales": contVisitas,
            "visitasProgramadas": contProgramadas,
            "porcentaje": Math.round((contProgramadas / contVisitas) * 100)
          });

        contVisitas = 0;
        contProgramadas = 0;
      }
      else {
        clientesquintil.forEach(element => {
          var lsVisitas = element?.visitas?.filter((a) => a.cicloAnterior == false);
          if (lsVisitas.length > 0) contClientes = contClientes + 1;
          var programadas = lsVisitas?.filter((a) => a.visitDate != null).length;
          if (programadas > 0) contProgramadas = contProgramadas + 1;
        });

        objeto.push(
          {
            "quintil": quintil[0].quintil,
            "clientesTotales": contClientes,
            "visitasProgramadas": contProgramadas,
            "porcentaje": Math.round((contProgramadas / contClientes) * 100)
          });

        contClientes = 0;
        contProgramadas = 0;
      }

    });

    return objeto;
  }

}

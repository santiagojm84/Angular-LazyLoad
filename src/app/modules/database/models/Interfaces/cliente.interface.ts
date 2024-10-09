import { EstadosCarteraInterface } from "./estadosCartera.interface";
import { EstadosSemanasInterface } from "./estadosSemana.interface";
import { VisitasInterface } from "./visitas.interface";

export interface ClientesInterface {
    id: number;
    nombre: string;
    quintil: string;
    codigo: Number;
    activo: boolean;
    estado: number;
    cantidad: number;
    cantidadesAsignadas: number;
    visitas: Array<VisitasInterface>;
    nombreCiudad: string;
    nombreBarrio: string;
    idQuintil: number;
    etiquetaVencida: Boolean;
    duracion: number;
    actualizar: boolean;
    cicloAnterior: boolean;

    estadoFactura: string;
    idEstadoFactura: number;

    cupoDisponible: number;
    clase: string;
    direccion: string;
    telefono: string;
    frecuenciaVisita: string;

    listaEstadosCartera: Array<EstadosCarteraInterface>;
    estadoVisita: number;
    nombreEstado: string;

    ListaestadoFacturacion: Array<EstadosCarteraInterface>;

    listaEstadosSemana: Array<EstadosSemanasInterface>;
    semanas: string;
    cubrimiento: string;
    colocacion: string;
}

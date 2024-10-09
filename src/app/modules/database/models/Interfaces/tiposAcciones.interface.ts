import { AccionesInterface } from "./acciones.interface";

export interface TiposAccionesInterface {
    id_TypeAction: number;
    name_TypeAction: string;
    clasification: number;    
    listaAcciones: Array<AccionesInterface>;
}
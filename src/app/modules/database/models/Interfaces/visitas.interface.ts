export interface VisitasInterface {
    id: number;
    visitDate: Date;
    activo: boolean;
    actualizar: boolean;
    idPlan: number;
    state: number;
    id_Route?: number;
    id_Agent?: number;
    id_Entity: number;  // ID CLIENTE
    id_Visit: number;  // ID VISITA
    visit_Duration: number;  // DURACIÓN VISITA
    scheduleDate: Date // FECHA DE VISITA
    fechaFin: Date;
    fechaInicio: Date;
    gpsInitLat: string;
    gpsInitLng: string;
    gpsFinishLat: string;
    gpsFinishLng: string;
    commentVisit: string;
    commentAction: string;
    savedPlan: boolean;
    cicloAnterior: boolean;
    description: string;
    commentManager: string;
    SavedPlanDate: Date | null;
    visita_nueva: string;
    sugeria_ant: string;
    Estado_Sugeria: string;
}
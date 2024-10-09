export interface AccionesInterface {
    id: number;
    idAction: number;
    name: string;
    idActionType: number;
    target: string;
    description: string;
    urlExternal: string;
    idPlan: string;
    order: string;
    required: string;
    state: boolean;
    isShowed: boolean;
    route: string;
    creado: boolean;
    modificado: boolean;
    modificadoAnterior: boolean;
    modificadoEjecucion: boolean;
    idVisit: number;
    enviarBack: boolean;
    idAgent: number;
    routerId: number;
    idDB: number;
    idSegmentation: number;
}

export interface AccionesInterfaceWithSegmentation extends AccionesInterface {
    idSegmentation: number;
}

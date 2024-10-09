import {Creator, Serializable} from '@database/interface';
// import {v4 as uuidv4} from 'uuid';

export class VariablesCodigoEstadistico implements Serializable {
  public Id: string;
  public Data:any;
  // public Codigo: string;
  // public Grupo: string;
  // public GrupoForeignKey: string;
  // public Orden: number
  // public Requerido: boolean;
  // public Padre: string;
  // public Nombre: string;
  // public Estado: string;
  // public TipoVariable: string;
  // public Settings: string;
  // public Ayuda: string;
  // public Condicion: string;
  // public TamanoVariable: number
  // public SoloConsulta: boolean;
  // public VariablePadre: boolean;
  // public FechaIngreso: string;
  // public UsuarioIngreso: string;
  // public FechaModificacion: string;
  // public UsuarioModificacion: string;
  // public CampoEquivalenteBi: string;
  // public IdVariableEQ: string;
  // public EnunciadoPregunta: string;
  // public HelperPregunta: string;
  // public VersionCortaPregunta: string;
  // public TipoPregunta: string;
  // public SettingsPregunta: string;
  // public Seguimiento: boolean;

  constructor(params: IVariablesCodigoEstadistico) {
    this.Id = params.Id;
    this.Data = params.Data;
    // this.Codigo = params.Codigo;
    // this.Grupo = params.Grupo;
    // this.GrupoForeignKey = params.GrupoForeignKey;
    // this.Orden = params.Orden;
    // this.Requerido = params.Requerido;
    // this.Padre = params.Padre;
    // this.Nombre = params.Nombre;
    // this.Estado = params.Estado;
    // this.TipoVariable = params.TipoVariable;
    // this.Settings = params.Settings;
    // this.Ayuda = params.Ayuda;
    // this.Condicion = params.Condicion;
    // this.TamanoVariable = params.TamanoVariable;
    // this.SoloConsulta = params.SoloConsulta;
    // this.VariablePadre = params.VariablePadre;
    // this.FechaIngreso = params.FechaIngreso;
    // this.UsuarioIngreso = params.UsuarioIngreso;
    // this.FechaModificacion = params.FechaModificacion;
    // this.UsuarioModificacion = params.UsuarioModificacion;
    // this.CampoEquivalenteBi = params.CampoEquivalenteBi;
    // this.IdVariableEQ = params.IdVariableEQ;
    // this.EnunciadoPregunta = params.EnunciadoPregunta;
    // this.HelperPregunta = params.HelperPregunta;
    // this.VersionCortaPregunta = params.VersionCortaPregunta;
    // this.TipoPregunta = params.TipoPregunta;
    // this.SettingsPregunta = params.SettingsPregunta;
    // this.Seguimiento = params.Seguimiento;
  }

  getKey(): string {
    return this.Id;
  }

  toJSON(): IVariablesCodigoEstadistico {
    return {
      Id:this.Id,
      Data:this.Data
      // Codigo:this.Codigo,
      // Grupo:this.Grupo,
      // GrupoForeignKey:this.GrupoForeignKey,
      // Orden:this.Orden,
      // Requerido:this.Requerido,
      // Padre:this.Padre,
      // Nombre:this.Nombre,
      // Estado:this.Estado,
      // TipoVariable:this.TipoVariable,
      // Settings:this.Settings,
      // Ayuda:this.Ayuda,
      // Condicion:this.Condicion,
      // TamanoVariable:this.TamanoVariable,
      // SoloConsulta:this.SoloConsulta,
      // VariablePadre:this.VariablePadre,
      // FechaIngreso:this.FechaIngreso,
      // UsuarioIngreso:this.UsuarioIngreso,
      // FechaModificacion:this.FechaModificacion,
      // UsuarioModificacion:this.UsuarioModificacion,
      // CampoEquivalenteBi:this.CampoEquivalenteBi,
      // IdVariableEQ:this.IdVariableEQ,
      // EnunciadoPregunta:this.EnunciadoPregunta,
      // HelperPregunta:this.HelperPregunta,
      // VersionCortaPregunta:this.VersionCortaPregunta,
      // TipoPregunta:this.TipoPregunta,
      // SettingsPregunta:this.SettingsPregunta,
      // Seguimiento:this.Seguimiento
    };
  }
}

export interface IVariablesCodigoEstadistico {
  Id?: string;
  Data?:any;
  // Codigo?: string;
  // Grupo?: string;
  // GrupoForeignKey?: string;
  // Orden?: number
  // Requerido?: boolean;
  // Padre?: string;
  // Nombre?: string;
  // Estado?: string;
  // TipoVariable?: string;
  // Settings?: string;
  // Ayuda?: string;
  // Condicion?: string;
  // TamanoVariable?: number
  // SoloConsulta?: boolean;
  // VariablePadre?: boolean;
  // FechaIngreso?: string;
  // UsuarioIngreso?: string;
  // FechaModificacion?: string;
  // UsuarioModificacion?: string;
  // CampoEquivalenteBi?: string;
  // IdVariableEQ?: string;
  // EnunciadoPregunta?: string;
  // HelperPregunta?: string;
  // VersionCortaPregunta?: string
  // TipoPregunta?: string;
  // SettingsPregunta?: string;
  // Seguimiento?: boolean;
}

export class VariablesCodigoEstadisticoCreator extends Creator<VariablesCodigoEstadistico> {
  factoryMethod(params: IVariablesCodigoEstadistico): VariablesCodigoEstadistico {
    // if(!params.id) {
    //   params.id = uuidv4();
    // }
    return new VariablesCodigoEstadistico(params);
  }
}

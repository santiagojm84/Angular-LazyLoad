import {Creator, Serializable} from '@database/interface';

export class FieldLocation implements Serializable {
  idLocation: number;
  nameLocation: string;
  titleTag: string;

  constructor(params: IFieldLocation) {
    this.idLocation = params.idLocation;
    this.nameLocation = params.nameLocation;
    this.titleTag = FIELD_TITLE[params.nameLocation] || undefined;
  }

  getKey(): number {
    return this.idLocation;
  }

  toJSON(): IFieldLocation {
    return {
      idLocation: this.idLocation,
      nameLocation: this.nameLocation
    }
  }
}

export interface IFieldLocation {
  idLocation: number;
  nameLocation: string;
  titleTag?: string;
}

export class FieldLocationCreator extends Creator<FieldLocation> {
  factoryMethod(params: IFieldLocation): FieldLocation {
    return new FieldLocation(params);
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
const FIELD_TITLE = {
  MENU: '',
  'INFO BASICA': 'TITULO_INFO_ADMIN_BASICA',
  'INFO DETALLADA': 'TITULO_INFO_ADMIN_DET_CLIENTE',
  'INFO ADMINISTRATIVA': 'TITULO_INFO_ADMIN_CLIENTE'
};

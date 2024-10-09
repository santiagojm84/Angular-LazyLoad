export interface IDatabase {
  name: string;
  currentVersion: number;
  stores: Array<IStore>;
}

export interface IVersions {
  [version: number]: Array<IStore>;
}

export interface IStore {
  id: number;
  name: string;
  parameters: IDBObjectStoreParameters;
  indexes: Array<IIndex>;
}

export interface IIndex {
  name: string;
  key: string | string[];
  parameters?: IDBIndexParameters;
}

export interface Serializable {
  getKey(): number | string;

  toJSON(): any;
}

export abstract class Creator<T> {
  public abstract factoryMethod(params: any): T;
}

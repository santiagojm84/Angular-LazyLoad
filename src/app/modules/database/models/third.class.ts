import {IModule} from './agent';
import {IDynamicFilter} from '@design-tq/widgets';
import {Creator, Serializable} from '../interface';
import {ITqFilters} from '@design-tq/components/tq-filters/tq-filters.component';

export class ThirdField implements Serializable {
  id: number;
  name: string;
  type: string;
  size: number;
  description: string;
  operation: string;
  order: number;
  title: boolean;
  filter: boolean;
  location: string;

  constructor(params: IThirdField) {
    this.id = params.id;
    this.name = params.name;
    this.type = params.type;
    this.size = params.size;
    this.description = params.description;
    this.operation = params.operation;
    this.order = params.order;
    this.title = !!params.title;
    this.filter = !!params.filter;
    this.location = params.location ?? '';
  }

  getKey(): number {
    return this.id;
  }

  get dynamicFilter(): IDynamicFilter {
    return {
      label: this.description,
      slug: `${this.id}`,
      tags: []
    };
  }

  toJSON(): IThirdField {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      size: this.size,
      description: this.description,
      operation: this.operation,
      order: this.order,
      title: this.title,
      filter: this.filter,
      location: this.location
    };
  }

}

export interface IThirdField {
  id: number;
  name: string;
  type: string;
  size: number;
  description: string;
  operation: string;
  order: number;
  title: boolean;
  filter: boolean;
  location: string;
}

export class Third implements Serializable {
  id: number;
  name: string;
  fields: Array<ThirdField>;

  constructor(params: IThird) {
    this.id = params.id;
    this.name = params.name;
    this.fields = [];
  }

  getKey(): number {
    return this.id;
  }

  get module(): IModule {
    return {
      name: `Maestras ${this.name}`.replace(/\w+/g, (w) => (w[0].toUpperCase() + w.slice(1).toLowerCase())),
      slug: '',
      module: '',
      layout: {},
      icon: 'fal fa-address-book',
      route: `/ejecucion/terceros/${this.id}`
    };
  }

  public addField(f: ThirdField) {
    this.fields.push(f);
  }

  get filters(): Array<ITqFilters> {
    return this.fields.filter(f => f.filter).map(f => ({
      label: f.description,
      slug: `${f.id}`,
      list: []
    }));
  }

  toJSON(): IThird {
    return {
      id: this.id,
      name: this.name,
      fields: this.fields.map(f => f.toJSON())
    };
  }
}

export interface IThird {
  id: number;
  name: string;
  fields: Array<IThirdField>;
}


export class ThirdFieldCreator extends Creator<ThirdField> {
  factoryMethod(params: IThirdField): ThirdField {
    return new ThirdField(params);
  }
}

export class ThirdCreator extends Creator<Third> {

  factoryMethod(params: IThird): Third {
    const creator = new ThirdFieldCreator();
    const item = new Third(params);
    (params.fields || []).forEach((f: IThirdField) => {
      item.addField(creator.factoryMethod(f));
    });
    return item;
  }
  
}

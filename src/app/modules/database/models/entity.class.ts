import { Third, ThirdCreator, ThirdField } from './third.class';
import { IListItem } from '@design-tq/pages';
import { DatabaseService } from '@database/database.service';
import { getDBStore, STORES } from '@database/database.const';
import { EntitySummary, EntitySummaryCreator } from '../../../app/shared/models/entity-summary.class';
import { DocumentPortfolio, DocumentPortfolioCreator } from '../../../app/shared/models/document-portfolio.class';
import { Creator, Serializable } from '@database/interface';
import { environment } from '../../../environments/environment';

export class Entity implements Serializable {
  id: number;
  thirdId: number;
  institutionId: number;
  personId: number;
  entityData: Array<{
    id: number;
    value: string;
  }>;
  third: Third;
  public db: DatabaseService;
  public summary: EntitySummary;
  public documents: Array<DocumentPortfolio>;
  public cupo: number;
  public compromisoVenta: number;

  constructor(params: IEntity) {
    this.id = params.id;
    this.thirdId = params.thirdId;
    this.institutionId = params.institutionId;
    this.personId = params.personId;
    this.entityData = params.entityData || [];
  }

  getKey(): number {
    return this.id;
  }

  getListItem(): IListItem {
    const name = this.third.fields.find(f => f.name.toUpperCase() === 'NOMBRE');
    const id = this.third.fields.find(f => f.name.toUpperCase() === 'ID');
    return {
      label: name ? this.entityData.find(e => e.id === name.id)?.value : '',
      slug: `${this.id}`,
      details: id ? `ID: ${this.entityData.find(e => e.id === id.id)?.value}` : '',
      keywords: [],
      categories: []
    };
  }

  public match(term: string): boolean {
    return ['ID', 'NOMBRE'].some((f: string) => {
      const field = this.third.fields.find(i => i.description.toUpperCase() === f);
      const value = field ? this.entityData.find(e => e.id === field.id)?.value : undefined;
      return value ? `${value}`.toLowerCase().includes(term.toLowerCase()) : false;
    });
  }

  async getCupo(): Promise<number> {
    await this.loadDocuments();
    return this.documents?.length ? Math.max(...this.documents.map(d => d.availableQuota || 0)) : 0;
  }

  async getCompVta(): Promise<number>
  {
    return this.compromisoVenta;
  }

  get page(): any {
    const fieldCupo = this.third.fields.find(f => f.id === Number(environment?.tercerocupo_disponible||0));
    const valCupo = this.entityData.find(d => d.id === fieldCupo?.id)?.value;

    const fieldCompVta = this.third.fields.find(f => f.id === Number(environment?.tercerocompromiso||0));
    const valCompVta = this.entityData.find(d => d.id === fieldCompVta?.id)?.value;

    try {
        this.cupo = Number(valCupo || 0);
        this.compromisoVenta = Number(valCompVta || 0)
    } catch (e) {
        this.cupo = 0;
        this.compromisoVenta = 0;
    }
    const title = this.third.fields.find(f => f.name === 'TITULO_INFO_CLIENTE')?.description;
    //const title =  this.third.fields.find(f => f.name.toUpperCase() === 'NOMBRE');
    return {
      id: this.id,
      //title: title ? this.entityData.find(e => e.id === title.id)?.value : '', //this.title,
      title: this.title,

      info: {
        title,
        fields: this.getFields(['INFO BASICA']).map(f => ({
          ...f,
          type: 'text'
        })),
        actions: [],
        dashboard: {}
      },
      activities: '',
      entity: this
    };
  }

  get cifras(): any {
    return {
      ...this.summary?.cifras,
      cantidadPedidos: this.documents.filter(d => d.matchStatusCpto(['1', '2', '3', '4', '5']))?.length ?? 0
    };
  }

  getAttributeValue(id: number) {
    const find = this.entityData.find(e => e.id === id);
    return find?.value;
  }

  filterBy(fs: Array<any>): boolean {
    return fs.map((f: any) => {
      const find = this.entityData.find(e => e.id === +f.slug);
      return find && f.list.some(i => i.slug === find.value);
    }).every(i => i);
  }

  getFields(keys: Array<string>): Array<IInfoField> {
    // const fields = (this.third?.fields.filter(f => keys.find(k => f.location === k)) || []).reduce((acc: any, item: ThirdField) => { //TODO: FIELDS YA NO TIENE LOCATION

    const fields = (this.third?.fields.filter(f => keys.find(k => f.location === k)) || []).reduce((acc: any, item: ThirdField) => {
      acc[item.id] = item;
      return acc;
    }, {});
    return this.entityData.filter((e: any) => !!fields[e.id]).map((e: any) => ({
      label: fields[e.id]?.description,
      value: e.value,
      order: fields[e.id].order
    })).sort((a: any, b: any) => a.order - b.order);
  }

  getAllFields(keys: Array<string>): Array<IInfoField> {
    const fields = (this.third?.fields.filter(f => keys.find(k => f.location === k && !f.title)) || []).reduce((acc: any, item: ThirdField) => {
      acc[item.id] = item;
      return acc;
    }, {});
    return Object.keys(fields).map((key: string) => {
      const find = this.entityData.find(e => e.id === fields[key]?.id)?.value;
      return {
        label: fields[key]?.description,
        value: find ? find : null,
        order: fields[key]?.order,
        type: FieldType[fields[key].name] || 'text'
      };
    }).sort((a: any, b: any) => a.order - b.order);
  }

  get code(): string {
    const code = this.third.fields.find(t => t.name.toUpperCase() === 'ID');
    return this.entityData.find(e => e.id === code?.id)?.value || '';
  }

  get title(): string {
    const find = this.third?.fields.find(f => f.name.toUpperCase() === 'NOMBRE');//!!f.title);
    return find ? this.entityData.find(e => e.id === find.id)?.value : null ?? '';
    /*
        const title =  this.third.fields.find(f => f.name.toUpperCase() === 'NOMBRE');
        return title ? this.entityData.find(e => e.id === title.id)?.value : ''; //this.title,
    
        */

  }

  get details(): Array<any> {
    return [];
  }

  async load(): Promise<void> {
    try {

      this.third = await this.db.getObjectByKey(
        getDBStore(STORES.Third),
        this.thirdId,
        new ThirdCreator()
      );
    } catch (e) {
      this.third = undefined;
    }
    try {
      // aqui se calcula la cartera asg
      this.summary = await this.db.getObjectByKey(
        getDBStore(STORES.EntitySummary),
        this.id,
        new EntitySummaryCreator()
      );

    } catch (e) {
      this.summary = undefined;
    }

    const title = this.third.fields.find(f => f.name.toUpperCase() === 'NOMBRE');



  }

  async loadDocuments(): Promise<void> {
    this.documents = await this.db.getAllObjectByIndexValue(
      getDBStore(STORES.Document),
      'Entity',
      this.id,
      new DocumentPortfolioCreator()
    );
    this.documents.forEach((d: DocumentPortfolio) => {
      d.children.push(...this.documents.filter(_ => _.fatherDocId && `${_.fatherDocId}` === d.docId));
    });
  }

  toJSON(): IEntity {
    return {
      id: this.id,
      thirdId: this.thirdId,
      institutionId: this.institutionId,
      title: this.title,
      personId: this.personId,
      entityData: this.entityData
    };
  }
}


export interface IEntity {
  id: number;
  thirdId: number;
  institutionId: number;
  personId: number;
  title: string;
  entityData: Array<{
    id: number;
    value: string;
  }>;
}

export class EntityCreator extends Creator<Entity> {
  constructor(public db: DatabaseService) {
    super();
  }

  factoryMethod(params: IEntity): Entity {
    const e = new Entity(params);
    e.db = this.db;
    return e;
  }
}

export interface IInfoField {
  label: string;
  value: string;
  order: number;
}

export const FieldType = {
  TELEFONO: 'tel',
  EMAIL: 'email',
  CUPO_DISPONIBLE: 'currency'
};


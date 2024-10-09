import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DATABASE } from './database.const';
import { IIndex, IStore } from './database.interface';
import { Creator, Serializable } from './interface';

@Injectable()
export class DatabaseService {
  private db: IDBDatabase;
  private dbPromise: Promise<void>;

  constructor() {}

  public async init(): Promise<boolean> {
    await this.check();
    await this.initDatabase();
    return true;
  }

  public initDatabase(): Promise<void> {
    this.dbPromise = new Promise<void>((resolve, reject) => {
      const request: IDBOpenDBRequest = window.indexedDB.open(
        DATABASE.name,
        DATABASE.currentVersion
      );

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db: IDBDatabase = request.result;
        const stores: DOMStringList = db.objectStoreNames;
        const currentStores: Array<string> = [];
        DATABASE.stores.forEach((istore: IStore) => {
          currentStores.push(istore.name);
          if (!stores.contains(istore.name)) {
            const store = db.createObjectStore(istore.name, istore.parameters);
            for (const iindex of istore.indexes) {
              if (!!!iindex.parameters) {
                store.createIndex(iindex.name, iindex.key);
              } else {
                store.createIndex(iindex.name, iindex.key, iindex.parameters);
              }
            }
          } else {
            const tx: IDBTransaction = request.transaction;
            const store: IDBObjectStore = tx.objectStore(istore.name);
            for (const iindex of istore.indexes) {
              if (!store.indexNames.contains(iindex.name)) {
                if (!!!iindex.parameters) {
                  store.createIndex(iindex.name, iindex.key);
                } else {
                  store.createIndex(iindex.name, iindex.key, iindex.parameters);
                }
              }
            }
            for (let i = 0; i < store.indexNames.length; i++) {
              const indexName = store.indexNames.item(i);
              const find = istore.indexes.find(
                (index: IIndex) => index.name === indexName
              );
              if (!find) {
                store.deleteIndex(indexName);
              }
            }
          }
        });

        const ss: DOMStringList = db.objectStoreNames;
        for (let i = 0; i < ss.length; i++) {
          if (!currentStores.find((s) => s === ss.item(i))) {
            db.deleteObjectStore(ss.item(i));
          }
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        if (this.db) {
          this.db.onversionchange = (ev: any) => {
            if (ev.target) {
              ev.target.close();
            }
          };
        }
        resolve();
      };

      request.onerror = (e) => {
        console.error(e);
        (window.navigator as any).notification.alert(
          'La aplicación no puede funcionar sin acceso a la base de datos.',
          () => {
            reject();
          }
        );
      };
    });
    return this.dbPromise;
  }
  public obtenerObjetoPorPropiedadDB(
    storeName: string,
    value: any,
    propiedad: any
  ): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const newObj = [];
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.openCursor().onsuccess = (event: any) => {
          const cursor = event.target.result;
          if (cursor) {
            for (const [key, value] of Object.entries(cursor.value)) {
              //Busca y filtra los objetos por la propiedad
              if (key == propiedad && value == value) {
                newObj.push(cursor.value);
                break;
              }
            }
            cursor.continue();
          } else {
            resolve(newObj);
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  }
  public async agregarObjectoIndexedDB(
    storeName: string,
    valor: any
  ): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      var request = store.put(valor);
      request.onsuccess = function (e: any) {
        valor.id = e.target.result;
        resolve(valor);
      };
      request.onerror = function (e) {
        reject(e);
      };
    });
  }
  public agregarListaObjectoIndexedDB(
    storeName: string,
    valor: any
  ): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      valor?.forEach((element) => {
        var request = store.put(element);
        if (store.autoIncrement == true) {
          request.onsuccess = function (e: any) {
            element.id = e.target.result;
          };
          request.onerror = function (e) {
            reject(e);
          };
        }
      });
      resolve(valor);
    });
  }
  public eliminarDatosTablaIndexedDB(storeName: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.clear();
      resolve(store);
    });
  }
  
  // ? IMPORTANTE: Metodo para agregar un objeto a la base de datos
  public async actualizarObjetoIndexedDB(storeName: string, object: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.delete(object.id);
        var result = store.put(object);
        result.onsuccess = await function (event: any) {
          resolve(store);
        };
        result.onerror = await function (err: any) {
          reject(err);
        };
      } catch (error) {
        reject(error);
      }
    });
  }
  public obtenerListaObjetoIndexedDB(storeName: string) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        var result = store.getAll();
        result.onsuccess = await function (event: any) {
          if (event.target.result) {
            resolve(event.target.result);
          } else {
            reject('Error');
          }
        };
        result.onerror = await function (err: any) {
          reject(err);
        };
      } catch (error) {
        reject(error);
      }
    });
  }
  public obtenerObjetoIndexedDB(storeName: string, id: number) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        var result = store.get(id);
        result.onsuccess = await function (event: any) {
          if (event.target.result) {
            resolve(event.target.result);
          } else {
            reject('No existe el valor: ' + id);
          }
        };
        result.onerror = await function (err: any) {
          reject(err);
        };
      } catch (error) {
        reject(error);
      }
    });
  }
  //=================================================================================

  public addObject<T>(storeName: string, value: Serializable): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.dbPromise.then(() => {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const request = store.put(value.toJSON());
        request.onsuccess = (evt: any) => {
          const res: IDBRequest = evt.srcElement;
          resolve({
            key: res.result,
          });
        };
        request.onerror = (error: any) => {
          console.error(error);
          reject({
            error,
          });
        };
      });
    });
  }

  public bulkObjects(
    storeName: string,
    values: Array<Serializable>
  ): Observable<number> {
    const subject = new Subject<number>();
    this.dbPromise.then(() => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      let i = 0;
      const putNext = () => {
        if (i < values.length) {
          store.put(values[i].toJSON()).onsuccess = putNext;
          subject.next(((i + 1) / values.length) * 100);
          ++i;
        } else {
          subject.complete();
        }
      };
      putNext();
    });
    return subject.asObservable();
  }

  public bulkObjectsPromise(
    storeName: string,
    values: Array<Serializable>
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dbPromise.then(() => {
        try {
          const tx = this.db.transaction(storeName, 'readwrite');
          const store = tx.objectStore(storeName);
          let i = 0;

          const putNext = () => {
            if (i < values.length) {
              store.put(values[i].toJSON()).onsuccess = putNext;
              ++i;
            } else {
              resolve();
            }
          };
          putNext();
        } catch (error) {
          console.log(`error${storeName}`, error);
          resolve();
        }
      });
    });
  }

  public updateObject<T>(
    storeName: string,
    obj: Serializable
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.dbPromise.then(() => {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const del = store.delete(obj.getKey());
        del.onsuccess = (evt: Event) => {
          const request = store.put(obj.toJSON());
          request.onsuccess = (evnt: Event) => {
            resolve(true);
          };
          request.onerror = (evnt: Event) => {
            console.error(evnt);
            reject(false);
          };
        };
        del.onerror = (evt: Event) => {
          console.error(evt);
          reject(false);
        };
      });
    });
  }

  public deleteObject<T>(
    storeName: string,
    obj: Serializable
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.dbPromise.then(() => {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const del = store.delete(obj.getKey());
        del.onsuccess = (evt: Event) => {
          resolve(true);
        };
        del.onerror = (evt: Event) => {
          console.error(evt);
          reject(false);
        };
      });
    });
  }

  public limpiarTablaIndexedDB(storeName: string) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.clear();
        resolve('');
      } catch (error) {
        reject(error);
      }
    });
  }

  public getAllObjects<T>(
    storeName: string,
    creator: Creator<T>
  ): Promise<Array<T>> {
    return new Promise((resolve, reject) => {
      this.dbPromise.then(() => {
        const tx = this.db.transaction(storeName);
        const store = tx.objectStore(storeName);
        const items: Array<T> = [];
        const request = store.openCursor();
        request.onsuccess = (event: any) => {
          const cursor: IDBCursorWithValue = event.target.result;
          if (cursor) {
            items.push(creator.factoryMethod(cursor.value));
            cursor.continue();
          } else {
            resolve(items);
          }
        };
      });
    });
  }

  public async getPaginatedObjects<T>(
    storeName: string,
    page: number,
    size,
    creator: Creator<T>
  ): Promise<any> {
    let counter = 0;
    let advance = (page - 1) * size;
    return new Promise((resolve, reject) => {
      this.dbPromise.then(() => {
        const tx = this.db.transaction(storeName);
        const store = tx.objectStore(storeName);
        const items: Array<T> = [];
        const request = store.openCursor();
        request.onsuccess = (event: any) => {
          const cursor: IDBCursorWithValue = event.target.result;
          if (cursor) {
            if (advance) {
              cursor.advance(advance);
              advance = undefined;
            } else {
              if (counter < size) {
                counter++;
                items.push(creator.factoryMethod(cursor.value));
                cursor.continue();
              } else {
                resolve(items);
              }
            }
          } else {
            resolve(items);
          }
        };
      });
    });
  }

  public getObjectByKey<T>(
    storeName: string,
    key: number | string,
    creator: Creator<T>
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.dbPromise.then(() => {
        const tx = this.db.transaction(storeName);
        const store = tx.objectStore(storeName);
        const request = store.openCursor(key);
        request.onsuccess = (event: any) => {
          const cursor = event.target.result;
          if (cursor) {
            resolve(creator.factoryMethod(cursor.value));
          } else {
            reject(undefined);
          }
        };
        request.onerror = (error) => {
          console.error(error);
          reject(undefined);
        };
      });
    });
  }

  public deleteObjectByKey<T>(storeName: string, key: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.dbPromise.then(() => {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const del = store.delete(key);
        del.onsuccess = (evt: Event) => {
          resolve(true);
        };
        del.onerror = (evt: Event) => {
          console.error(evt);
          reject(false);
        };
      });
    });
  }

  public getObjectByIndexValue<T>(
    storeName: string,
    indexName: string,
    value: any,
    creator: Creator<T>
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.dbPromise.then(() => {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const index = store.index(indexName);
        const request = index.openCursor(value);
        request.onsuccess = (event: any) => {
          const cursor = event.target.result;
          if (cursor) {
            resolve(creator.factoryMethod(cursor.value));
          } else {
            reject(undefined);
          }
        };
        request.onerror = (error) => {
          console.error(error);
          reject(undefined);
        };
      });
    });
  }

  public getObjectByIndexValues<T>(
    storeName: string,
    indexName: string,
    value: Array<string>,
    creator: Creator<T>
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.dbPromise.then(() => {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const index = store.index(indexName);
        const request = index.openCursor(value);
        request.onsuccess = (event: any) => {
          const cursor = event.target.result;
          if (cursor) {
            resolve(creator.factoryMethod(cursor.value));
          } else {
            reject(undefined);
          }
        };
        request.onerror = (error) => {
          console.error(error);
          reject(undefined);
        };
      });
    });
  }

  public getAllObjectByIndexValue<T>(
    storeName: string,
    indexName: string,
    value: any,
    creator: Creator<T>
  ): Promise<Array<T>> {
    return new Promise<Array<T>>((resolve, reject) => {
      this.dbPromise.then(() => {
        const tx: IDBTransaction = this.db.transaction(storeName, 'readwrite');
        const store: IDBObjectStore = tx.objectStore(storeName);
        const index: IDBIndex = store.index(indexName);
        const items: Array<T> = [];
        const request = index.openCursor(value);
        request.onsuccess = (event: any) => {
          const cursor = event.target.result;
          if (cursor) {
            items.push(creator.factoryMethod(cursor.value));
            cursor.continue();
          } else {
            resolve(items);
          }
        };
        request.onerror = (error) => {
          console.error(error);
          reject(undefined);
        };
      });
    });
  }

  public updateObjectByKey(
    storeName: string,
    data: any,
    key: number | string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.dbPromise.then(() => {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const request = store.delete(key);
        request.onsuccess = (event: any) => {
          const write = store.put(data);
          write.onsuccess = () => {
            resolve(true);
          };
          write.onerror = (reason) => {
            console.error(reason);
            reject(false);
          };
        };
        request.onerror = (error) => {
          console.error(error);
          reject(false);
        };
      });
    });
  }

  public clearStore(storeName: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.dbPromise.then(() => {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const request = store.clear();
        request.onsuccess = () => {
          resolve(true);
        };
        request.onerror = (reason) => {
          console.error('reason');
          console.error(reason);
          reject(false);
        };
      });
    });
  }

  public findByAttr<T>(
    storeName: string,
    attrs: Array<string>,
    value: string,
    creator: Creator<T>
  ): Promise<Array<T>> {
    return new Promise((resolve, reject) => {
      this.dbPromise.then(() => {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const items: Array<any> = [];
        const request = store.openCursor();
        const tmp = value.toLowerCase();
        request.onsuccess = (event: any) => {
          const cursor = event.target.result;
          if (cursor) {
            const flag = attrs.some((attr: string) => {
              if (!!cursor.value[attr]) {
                return String(cursor.value[attr]).toLowerCase().includes(tmp);
              }
              return false;
            });
            // const values = attrs.map((attr: string) => cursor.value[attr] ? String(cursor.value[attr]).toLowerCase() : '');
            // const flag = values.some(v => v && v.includes(value.toLowerCase()));
            if (flag) {
              items.push(cursor.value);
            }
            cursor.continue();
          } else {
            resolve(items.map((item: any) => creator.factoryMethod(item)));
          }
        };
        request.onerror = (reason) => {
          console.error(reason);
          reject([]);
        };
      });
    });
  }

  public clear(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Promise.all(DATABASE.stores.map((store) => this.clearStore(store.name)))
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    });
  }

  public count(storeName: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const tx: IDBTransaction = this.db.transaction(storeName, 'readonly');
      const store: IDBObjectStore = tx.objectStore(storeName);
      const request: IDBRequest = store.count();
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject();
      };
    });
  }

  private check(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(DATABASE.name);
      request.onsuccess = () => {
        const db: IDBDatabase = request.result;
        if (db.version > DATABASE.currentVersion) {
          db.close();
          const d = window.indexedDB.deleteDatabase(DATABASE.name);
          d.onsuccess = () => {
            d.result.close();
            localStorage.clear();
            resolve();
          };
          d.onerror = () => {
            resolve();
          };
        } else {
          db.close();
          resolve();
        }
      };
      request.onupgradeneeded = () => {
        request.result.close();
        resolve();
      };
      request.onerror = () => {
        console.log('error');
        resolve();
      };
    });
  }
}

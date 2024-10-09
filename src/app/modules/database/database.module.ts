import {APP_INITIALIZER, NgModule} from '@angular/core';
import {DatabaseService} from './database.service';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function loadDatabase(database: DatabaseService): () => Promise<void> {
  return () => new Promise((resolve, reject) => {
    database.init().then(() => {
      resolve();
    });
  });
}

@NgModule({
  providers: [
    DatabaseService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadDatabase,
      multi: true,
      deps: [DatabaseService]
    }
  ]
})
export class DatabaseModule {
}

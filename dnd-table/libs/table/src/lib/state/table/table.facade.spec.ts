import { Injectable, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { TableEntity } from './table.models';
import { TableEffects } from './table.effects';
import { TableFacade } from './table.facade';

import * as TableSelectors from './table.selectors';
import * as TableActions from './table.actions';
import {
  TABLE_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './table.reducer';
import { DataService } from '../../services/data.service';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

interface TestSchema {
  table: State;
}

@Injectable()
class DataServiceMock extends DataService {
  getUsers(): Observable<TableEntity[]> {
    return of([]);
  }
}

describe('TableFacade', () => {
  let facade: TableFacade;
  let dataService: DataService;
  let store: Store<TestSchema>;
  const createTableEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TableEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TABLE_FEATURE_KEY, reducer),
          EffectsModule.forFeature([TableEffects]),
          HttpClientTestingModule
        ],
        providers: [
          TableFacade,
          {
            provide: DataService,
            useClass: DataServiceMock
          }
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(TableFacade);
      dataService = TestBed.inject(DataService);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allTable$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allTable$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadTableSuccess` to manually update list
     */
    it('allTable$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allTable$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          TableActions.loadTableSuccess({
            table: [createTableEntity(0), createTableEntity(1)],
            columns: []
          })
        );

        list = await readFirst(facade.allTable$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});

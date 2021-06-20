import { TestBed, async } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { TableEffects } from './table.effects';
import * as TableActions from './table.actions';
import { DataService } from '../../services/data.service';
import { TableEntity, TableFacade } from '@app/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { Column } from '@app/shared';

@Injectable()
class DataServiceMock extends DataService {
  getUsers(): Observable<TableEntity[]> {
    return of([]);
  }

  getColumns(): Observable<Column[]> {
    return of([])
  }
}

describe('TableEffects', () => {
  let actions: Observable<any>;
  let effects: TableEffects;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), HttpClientTestingModule],
      providers: [
        TableEffects,
        TableFacade,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: DataService,
          useClass: DataServiceMock
        }
      ],
    });

    effects = TestBed.inject(TableEffects);
    dataService = TestBed.inject(DataService);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TableActions.init() });

      const expected = hot('-a-|', {
        a: TableActions.loadTableSuccess({ table: [], columns: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

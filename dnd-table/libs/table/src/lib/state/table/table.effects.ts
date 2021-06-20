import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as TableFeature from './table.reducer';
import * as TableActions from './table.actions';
import { DataService } from '../../services/data.service';
import { first, map, switchMap } from 'rxjs/operators';
import { TableFacade } from './table.facade';
import { TableEntity } from './table.models';
import { Column, SortOrder } from '@app/shared';
import { forkJoin } from 'rxjs';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable()
export class TableEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TableActions.init),
      fetch({
        run: (action) => {
          return forkJoin([
            this.dataService.getUsers(),
            this.dataService.getColumns()
          ])
            .pipe(
              map(([users, columns]) => TableActions.loadTableSuccess({ table: users, columns }))
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return TableActions.loadTableFailure({ error });
        }
      })
    )
  );

  sortingChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TableActions.sortByField),
      switchMap(({ field, sortOrder }) =>
        forkJoin([
          this.tableFacade.allTable$.pipe(first()),
          this.tableFacade.tableColumns$.pipe(first()),
          this.tableFacade.originalData$.pipe(first())
        ])
          .pipe(
            map(([entities, columns, originalEntities]: [TableEntity[], Column[], TableEntity[]]) => {

              const updatedColIndex = columns.findIndex((column) => field === column.field);
              const updatedColumns: Column[] = columns.map((column, index) => ({
                ...column,
                sortOrder: index === updatedColIndex ? sortOrder : SortOrder.None
              }));
              if (sortOrder === SortOrder.None) {
                return { entities: originalEntities, columns: updatedColumns };
              }
              const updatedEntities = [...entities].sort((itemA, itemB) => {
                let smaller = 0;
                let bigger = 0;
                switch (sortOrder) {
                  case SortOrder.Desc:
                    smaller = 1;
                    bigger = -1;
                    break;
                  case SortOrder.Asc:
                    bigger = 1;
                    smaller = -1;
                    break;
                  default:
                    break;
                }

                if (itemA[field] > itemB[field]) {
                  return bigger;
                }
                if (itemA[field] < itemB[field]) {
                  return smaller;
                }
                return 0;
              });
              return { entities: updatedEntities, columns: updatedColumns };
            })
          )
      ),
      map(({ entities, columns }) => TableActions.setSortedData({ table: entities, columns }))
    )
  );

  columnWidthChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TableActions.changeColumnWidth),
      switchMap(({ field, width }) =>
          this.tableFacade.tableColumns$.pipe(first())
          .pipe(
            map((columns: Column[]) => {

              const updatedColIndex = columns.findIndex((column) => field === column.field);
              const updatedColumns: Column[] = columns.map((column, index) => {
                return index === updatedColIndex ? {
                  ...column,
                  width
                } : column;
              });
              return updatedColumns;
            })
          )
      ),
      map((columns) => TableActions.changeColumnsWidthSuccess({ columns }))
    )
  );

  columnsReorder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TableActions.changeColumnsOrder),
      switchMap(({ from, to }) =>
        this.tableFacade.tableColumns$.pipe(
          first(),
          map(columns => {
            const updatedColumns = [...columns];
            moveItemInArray(updatedColumns, from, to);
            return updatedColumns;
          })
        )
      ),
      map((columns) => TableActions.changeColumnsOrderSuccess({ columns }))
    )
  );

  constructor(private actions$: Actions, private dataService: DataService, private tableFacade: TableFacade) {
  }
}

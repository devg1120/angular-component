import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as TableActions from './table.actions';
import * as TableFeature from './table.reducer';
import * as TableSelectors from './table.selectors';

@Injectable()
export class TableFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(TableSelectors.getTableLoaded));
  allTable$ = this.store.pipe(select(TableSelectors.getAllTable));
  selectedTable$ = this.store.pipe(select(TableSelectors.getSelected));
  tableColumns$ = this.store.pipe(select(TableSelectors.getColumns));
  originalData$ = this.store.pipe(select(TableSelectors.getOriginalData));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(TableActions.init());
  }

  changeColumnsOrder(from, to) {
    this.store.dispatch(TableActions.changeColumnsOrder({ from, to }));
  }

  sortByField(field, sortOrder ) {
    this.store.dispatch(TableActions.sortByField({ field, sortOrder }));
  }

  changeColumnWidth(field, width ) {
    this.store.dispatch(TableActions.changeColumnWidth({ field, width }));
  }
}

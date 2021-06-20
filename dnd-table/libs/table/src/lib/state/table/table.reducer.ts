import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as TableActions from './table.actions';
import { TableEntity } from './table.models';
import { Column } from '@app/shared';

export const TABLE_FEATURE_KEY = 'table';

export interface State extends EntityState<TableEntity> {
  selectedId?: string | number; // which Table record has been selected
  loaded: boolean; // has the Table list been loaded
  error?: string | null; // last known error (if any)
  originalData?: TableEntity[],
  columns: Column[]
}

export interface TablePartialState {
  readonly [TABLE_FEATURE_KEY]: State;
}

export const tableAdapter: EntityAdapter<TableEntity> = createEntityAdapter<TableEntity>();

export const initialState: State = tableAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  columns: []
});

const tableReducer = createReducer(
  initialState,
  on(TableActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(TableActions.loadTableSuccess, (state, { table, columns }) =>
    tableAdapter.setAll(table, { ...state, loaded: true, originalData: table, columns })
  ),
  on(TableActions.loadTableFailure, (state, { error }) => ({ ...state, error })),
  on(TableActions.changeColumnsOrderSuccess, (state, { columns }) => ({ ...state, columns })),
  on(TableActions.changeColumnsWidthSuccess, (state, { columns }) => ({ ...state, columns })),
  on(TableActions.setSortedData, (state, { table, columns }) =>
    tableAdapter.setAll(table, { ...state, columns })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return tableReducer(state, action);
}

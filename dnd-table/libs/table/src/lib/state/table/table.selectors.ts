import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  TABLE_FEATURE_KEY,
  State,
  TablePartialState,
  tableAdapter,
} from './table.reducer';

// Lookup the 'Table' feature state managed by NgRx
export const getTableState = createFeatureSelector<TablePartialState, State>(
  TABLE_FEATURE_KEY
);

const { selectAll, selectEntities } = tableAdapter.getSelectors();

export const getTableLoaded = createSelector(
  getTableState,
  (state: State) => state.loaded
);

export const getTableError = createSelector(
  getTableState,
  (state: State) => state.error
);

export const getAllTable = createSelector(getTableState, (state: State) =>
  selectAll(state)
);

export const getTableEntities = createSelector(getTableState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getTableState,
  (state: State) => state.selectedId
);

export const getColumns = createSelector(
  getTableState,
  (state: State) => state.columns
);

export const getOriginalData = createSelector(
  getTableState,
  (state: State) => state.originalData
);

export const getSelected = createSelector(
  getTableEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

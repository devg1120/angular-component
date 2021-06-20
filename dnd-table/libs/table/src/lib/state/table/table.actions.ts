import { createAction, props } from '@ngrx/store';
import { TableEntity } from './table.models';
import { Column, SortOrder } from '@app/shared';

export const init = createAction('[Table Page] Init');

export const loadTableSuccess = createAction(
  '[Table/API] Load Table Success',
  props<{ table: TableEntity[], columns: Column[] }>()
);

export const loadTableFailure = createAction(
  '[Table/API] Load Table Failure',
  props<{ error: any }>()
);

export const sortByField = createAction(
  '[Table/Sort] Sort By Field',
  props<{ field: string, sortOrder: SortOrder }>()
)

export const changeColumnWidth = createAction(
  '[Table/Columns] Change Column Width',
  props<{ field: string, width: number }>()
)

export const changeColumnsWidthSuccess = createAction(
  '[Table/Columns] Change Column Width Success',
  props<{ columns: Column[] }>()
)

export const changeColumnsOrder = createAction(
  '[Table/Columns] Change Columns Order',
  props<{ from: number, to: number }>()
)

export const changeColumnsOrderSuccess = createAction(
  '[Table/Columns] Change Columns Order Success',
  props<{ columns: Column[] }>()
)

export const setSortedData = createAction(
  '[Table/Sort] Set Sorted Data',
  props<{ table: TableEntity[], columns: Column[] }>()
);

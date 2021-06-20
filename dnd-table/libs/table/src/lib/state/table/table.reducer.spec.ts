import { TableEntity } from './table.models';
import * as TableActions from './table.actions';
import { State, initialState, reducer } from './table.reducer';

describe('Table Reducer', () => {
  const createTableEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TableEntity);

  beforeEach(() => {});

  describe('valid Table actions', () => {
    it('loadTableSuccess should return set the list of known Table', () => {
      const table = [
        createTableEntity(0),
        createTableEntity(1),
      ];
      const action = TableActions.loadTableSuccess({ table, columns: [] });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});

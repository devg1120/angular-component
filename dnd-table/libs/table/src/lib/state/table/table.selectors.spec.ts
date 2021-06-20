import { TableEntity } from './table.models';
import { State, tableAdapter, initialState } from './table.reducer';
import * as TableSelectors from './table.selectors';

describe('Table Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTableId = (it) => it['id'];
  const createTableEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TableEntity);

  let state;

  beforeEach(() => {
    state = {
      table: tableAdapter.setAll(
        [
          createTableEntity(0),
          createTableEntity(1),
          createTableEntity(2),
        ],
        {
          ...initialState,
          selectedId: 1,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Table Selectors', () => {
    it('getAllTable() should return the list of Table', () => {
      const results = TableSelectors.getAllTable(state);
      const selId = getTableId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe(1);
    });

    it('getSelected() should return the selected Entity', () => {
      const result = TableSelectors.getSelected(state);
      const selId = getTableId(result);

      expect(selId).toBe(1);
    });

    it("getTableLoaded() should return the current 'loaded' status", () => {
      const result = TableSelectors.getTableLoaded(state);

      expect(result).toBe(true);
    });

    it("getTableError() should return the current 'error' state", () => {
      const result = TableSelectors.getTableError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

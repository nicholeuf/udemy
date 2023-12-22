import { produce } from 'immer';

import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce(
  (draft: CellsState = initialState, action: Action): CellsState => {
    switch (action.type) {
      case ActionType.SAVE_CELLS_ERROR: {
        draft.error = action.payload;
        return draft;
      }
      case ActionType.FETCH_CELLS: {
        draft.loading = true;
        draft.error = null;
        return draft;
      }
      case ActionType.FETCH_CELLS_COMPLETE: {
        draft.loading = false;
        draft.order = action.payload.map((cell) => cell.id);
        draft.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as CellsState['data']);
        return draft;
      }
      case ActionType.FETCH_CELLS_ERROR: {
        draft.loading = false;
        draft.error = action.payload;
        return draft;
      }
      case ActionType.UPDATE_CELL: {
        const { id, content } = action.payload;
        draft.data[id].content = content;
        return draft;
      }
      case ActionType.DELETE_CELL: {
        delete draft.data[action.payload];
        draft.order = draft.order.filter((id) => id !== action.payload);
        return draft;
      }
      case ActionType.MOVE_CELL: {
        const { direction } = action.payload;
        const index = draft.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > draft.order.length - 1) {
          return draft;
        }

        draft.order[index] = draft.order[targetIndex];
        draft.order[targetIndex] = action.payload.id;
        return draft;
      }
      case ActionType.INSERT_CELL_AFTER: {
        const cell: Cell = {
          content: '',
          type: action.payload.type,
          id: randomId(),
        };

        draft.data[cell.id] = cell;
        const index = draft.order.findIndex((id) => id === action.payload.id);
        if (index < 0) {
          // add to top of list
          draft.order.unshift(cell.id);
        } else {
          draft.order.splice(index + 1, 0, cell.id);
        }
        return draft;
      }

      default:
        return draft;
    }
  },
  initialState
);

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export default reducer;

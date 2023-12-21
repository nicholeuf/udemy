import { Dispatch, Middleware } from 'redux';
import { Action } from '../actions';
import { RootState } from '../reducers';
import { ActionType } from '../action-types';
import { saveCells } from '../action-creators';

export const persistMiddleware: Middleware<{}, RootState, Dispatch<Action>> = (
  store
) => {
  let timer: any;

  return (next) => (action) => {
    next(action);

    if (
      [
        ActionType.MOVE_CELL,
        ActionType.UPDATE_CELL,
        ActionType.INSERT_CELL_AFTER,
        ActionType.DELETE_CELL,
        // @ts-ignore
      ].includes((action && action.type) || '')
    ) {
      // debounce save calls
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        saveCells()(store.dispatch, store.getState);
      }, 250);
    }
  };
};

import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import reducers from './reducers';
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';
import { persistMiddleware } from './middlewares/persist-middleware';

export const store = createStore(
  reducers,
  {},
  composeWithDevToolsDevelopmentOnly(applyMiddleware(persistMiddleware, thunk))
);

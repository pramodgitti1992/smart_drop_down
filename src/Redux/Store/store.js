import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../Reducers';
import rootSaga from '../Saga';

const sagaMiddleware = createSagaMiddleware();
const composedEhancer = composeWithDevTools(
  applyMiddleware(sagaMiddleware),
)
const initialState = {};

const Store = createStore(rootReducer, initialState, composedEhancer)
sagaMiddleware.run(rootSaga);

export default Store;

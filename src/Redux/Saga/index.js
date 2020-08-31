import { all } from 'redux-saga/effects';

import { CountryWatcherSaga } from './countrySaga';

export default function* rootSaga() {
  yield all([
    CountryWatcherSaga()
  ]);
}
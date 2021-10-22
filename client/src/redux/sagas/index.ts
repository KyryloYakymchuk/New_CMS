import { all } from '@redux-saga/core/effects';
import { authWatcher } from './auth';
import { usersWatcher } from './users';

function* rootSaga() {
    yield all([authWatcher(), usersWatcher()]);
}

export default rootSaga;

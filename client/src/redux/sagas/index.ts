import { all } from '@redux-saga/core/effects';
import { authWatcher } from './auth';
import { usersWatcher } from './users';
import { groupsWatcher } from './groups';
function* rootSaga() {
    yield all([authWatcher(), usersWatcher(), groupsWatcher()]);
}

export default rootSaga;

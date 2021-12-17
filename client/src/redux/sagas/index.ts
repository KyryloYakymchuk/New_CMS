import { all } from '@redux-saga/core/effects';
import { authWatcher } from './auth';
import { usersWatcher } from './users';
import { groupsWatcher } from './groups';
import { modulesWatcher } from './modules';
import { ticketsWatcher } from './tickets';
function* rootSaga() {
    yield all([authWatcher(), usersWatcher(), groupsWatcher(), modulesWatcher(), ticketsWatcher()]);
}

export default rootSaga;

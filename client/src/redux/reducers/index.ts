import { combineReducers } from 'redux';
import error from './error';
import loader from './loader';
import modalStatus from './modal';
import menuReducer from './menu';
import users from './users';
import groups from './groups';

const rootReducer = combineReducers({
    menuReducer,
    error,
    loader,
    modalStatus,
    users,
    groups
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

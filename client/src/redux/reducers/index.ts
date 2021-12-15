import { combineReducers } from 'redux';
import error from './error';
import loader from './loader';
import modal from './modal';
import menuReducer from './menu';
import users from './users';
import groups from './groups';
import modules from './modules';
import tickets from './tickets';

const rootReducer = combineReducers({
    menuReducer,
    error,
    loader,
    modal,
    users,
    groups,
    modules, 
    tickets
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

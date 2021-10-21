import { combineReducers } from 'redux';
import error from './error';
import loader from './loader';
import modalStatus from './modal';
import menuReducer from './menu';

const rootReducer = combineReducers({ menuReducer, error, loader, modalStatus });

export default rootReducer;

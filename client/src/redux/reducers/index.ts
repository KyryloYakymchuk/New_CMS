import { combineReducers } from 'redux';
import menu from './menuStatus';
import error from './error';
import loader from './loader';
import modalStatus from './modal';

const rootReducer = combineReducers({ menu, error, loader, modalStatus });

export default rootReducer;

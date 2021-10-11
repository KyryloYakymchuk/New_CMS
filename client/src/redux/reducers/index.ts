import { combineReducers } from "redux";
import test from "./test";
import menu from "./menuStatus";

const rootReducer = combineReducers({ test, menu });

export default rootReducer;

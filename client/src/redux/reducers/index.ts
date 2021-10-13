import { combineReducers } from "redux";
import test from "./test";
import menu from "./menuStatus";
import error from "./error";

const rootReducer = combineReducers({ test, menu, error });

export default rootReducer;

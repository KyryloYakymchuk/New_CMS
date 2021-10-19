import { combineReducers } from "redux";
import menu from "./menuStatus";
import error from "./error";
import loader from "./loader";

const rootReducer = combineReducers({ menu, error, loader });

export default rootReducer;

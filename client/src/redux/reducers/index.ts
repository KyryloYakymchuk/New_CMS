import { CombinedState, combineReducers } from "redux";
import test from "./test";
import menu from "./menuStatus";
import error from "./error";
import users from "./users";

const rootReducer = combineReducers({ test, menu, error, users });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
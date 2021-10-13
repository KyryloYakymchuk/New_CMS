import { all } from "@redux-saga/core/effects";
import { authWatcher } from "./auth";

function* rootSaga() {
  yield all([authWatcher()]);
}

export default rootSaga;

import { put, takeEvery, call } from "@redux-saga/core/effects";
import { errorAction } from "@redux/actions/error";
import { loaderAction } from "@redux/actions/loader";
import {
  AuthActionsTypes,
  ILoginAction,
  IRegisterAction,
  IResetAction,
  IResetPasswordAction,
} from "@redux/types/auth";

import { ProtectedRoutes } from "@utils/enums/routes";

import { api } from "@services/api";

function* LoginReq(data: ILoginAction): Generator {
  const { value, history } = data.payload;
  try {
    const fieldsResponse: any = yield call(api.post, "/auth/login", value);
    window.localStorage.setItem(
      "NewCMS_accessToken",
      fieldsResponse.data.accessToken
    );
    history.push(ProtectedRoutes.DASHBOARD);
    yield put(errorAction());
  } catch (error: any) {
    yield put(errorAction(error.response.data.message));
  }
}

function* RegisterReq(data: IRegisterAction): Generator {
  const { value, setOpenModal } = data.payload;
  try {
    yield call(api.post, "/auth/register", value);
    setOpenModal(true);
    yield put(errorAction());
    yield put(loaderAction(false));
  } catch (error: any) {
    yield put(errorAction(error.response.data.message));
  }
}

function* ResetReq(data: IResetAction): Generator {
  const { email, setOpenModal } = data.payload;
  try {
    yield call(api.post, "/auth/password", { email: email });
    setOpenModal(true);
    yield put(errorAction());
    yield put(loaderAction(false));
  } catch (error: any) {
    yield put(errorAction(error.response.data.message));
  }
}

function* ResetPasswordReq(data: IResetPasswordAction): Generator {
  const { val, setOpenModal } = data.payload;

  try {
    yield call(api.post, "/auth/password/confirm", { ...val });
    setOpenModal(true);
    yield put(errorAction());
    yield put(loaderAction(false));
  } catch (error: any) {
    yield put(errorAction(error.response.data.message));
  }
}

export function* authWatcher() {
  yield takeEvery(AuthActionsTypes.LOGIN, LoginReq);
  yield takeEvery(AuthActionsTypes.REGISTER, RegisterReq);
  yield takeEvery(AuthActionsTypes.RESET, ResetReq);
  yield takeEvery(AuthActionsTypes.RESET_PASSWORD, ResetPasswordReq);
}

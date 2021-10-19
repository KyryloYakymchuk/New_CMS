import { put, takeEvery, call } from "@redux-saga/core/effects";
import { ErrorAction } from "@redux/actions/error";
import { LoaderAction } from "@redux/actions/loader";
import {
  AuthActionsTypes,
  ILoginAction,
  IRegisterAction,
  IResetAction,
  IResetPasswordAction,
} from "@redux/types/auth";
import { api } from "@services/api";

function* LoginReq(data: ILoginAction): Generator {
  const { value, history } = data.payload;
  try {
    const fieldsResponse: any = yield call(api.post, "/auth/login", value);
    window.localStorage.setItem(
      "NewCMS_accessToken",
      fieldsResponse.data.accessToken
    );
    history.push("/");
    yield put(ErrorAction());
  } catch (error: any) {
    yield put(ErrorAction(error.response.data.message));
  }
}

function* RegisterReq(data: IRegisterAction): Generator {
  const { value, setOpenModal } = data.payload;
  try {
    yield call(api.post, "/auth/register", value);
    setOpenModal(true);
    yield put(ErrorAction());
    yield put(LoaderAction(false));
  } catch (error: any) {
    yield put(ErrorAction(error.response.data.message));
  }
}

function* ResetReq(data: IResetAction): Generator {
  const { email, setOpenModal } = data.payload;
  try {
    yield call(api.post, "/auth/password", { email: email });
    setOpenModal(true);
    yield put(ErrorAction());
    yield put(LoaderAction(false));
  } catch (error: any) {
    yield put(ErrorAction(error.response.data.message));
  }
}

function* ResetPasswordReq(data: IResetPasswordAction): Generator {
  const { val, setOpenModal } = data.payload;

  try {
    yield call(api.post, "/auth/password/confirm", { ...val });
    setOpenModal(true);
    yield put(ErrorAction());
    yield put(LoaderAction(false));
  } catch (error: any) {
    yield put(ErrorAction(error.response.data.message));
  }
}

export function* authWatcher() {
  yield takeEvery(AuthActionsTypes.LOGIN, LoginReq);
  yield takeEvery(AuthActionsTypes.REGISTER, RegisterReq);
  yield takeEvery(AuthActionsTypes.RESET, ResetReq);
  yield takeEvery(AuthActionsTypes.RESET_PASSWORD, ResetPasswordReq);
}

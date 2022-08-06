import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, fork, put, take } from "redux-saga/effects";
import { authActions, LoginPayload } from "./authSlice";

function* handleLogin(payload: LoginPayload) {
  yield delay(1000);
  localStorage.setItem("access_token", "fake_token");
  // redirect to admin page
  yield put(authActions.navigateAdmin());
}
function* handleLogout() {
  try {
    yield delay(500);
    localStorage.removeItem("access_token");
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: "Herocode dev",
      })
    );
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message));
  }
  // redirect to login page
  yield put(authActions.navigateLogIn());
}
function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(
        authActions.login.type
      );
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    // Note: chỗ này dùng call (nếu dùng fork thì có thể nó chưa xóa đc token mà đã chạy tới vòng while bên trong luôn)
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}

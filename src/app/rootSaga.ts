import { all } from "redux-saga/effects";
import counterSaga from "../features/counter/counterSaga";
import authSaga from "../features/auth/authSaga";
import dashboardSaga from "../features/dashboard/dashboardSaga";
import studentSaga from "../features/students/studentSaga";
import { citySaga } from "../features/city/citySaga";
// function* helloSaga() {
//   console.log("Hello saga");
// }
export default function* rootSaga() {
  console.log("rootSaga");
  yield all([
    counterSaga(),
    authSaga(),
    dashboardSaga(),
    studentSaga(),
    citySaga(),
  ]);
}

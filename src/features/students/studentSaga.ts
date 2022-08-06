import { Student } from "./../../models/student";
import { studentActions } from "./studentSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ListParams, ListResponse } from "../../models";
import studentApi from "../../api/studentApi";

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(
      studentApi.getAll,
      action.payload
    );
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(studentActions.fetchStudentListFail("error"));
  }
}

export default function* studentSaga() {
  // watching fetch student action
  yield takeLatest(studentActions.fetchStudentList, fetchStudentList);
}

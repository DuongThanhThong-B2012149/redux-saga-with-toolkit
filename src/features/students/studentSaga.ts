import { Student } from "./../../models/student";
import { studentActions } from "./studentSlice";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
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

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
  // watching fetch student action
  yield takeLatest(studentActions.fetchStudentList, fetchStudentList);

  // Debounce search
  yield debounce(
    500,
    studentActions.setFilterWithDebounce.type,
    handleSearchDebounce
  );
}

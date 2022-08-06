import { cityActions } from "./citySlice";
import { call, put, takeLatest } from "redux-saga/effects";
import { City, ListResponse } from "../../models";
import cityApi from "../../api/cityApi";

function* fetchCityList() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll);
    yield put(cityActions.fetchCityListSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(cityActions.fetchCityListFail());
  }
}
export function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}

import { RootState } from "./../../app/store";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City, ListResponse } from "../../models";

interface CityState {
  loading: boolean;
  list: City[];
}

const initialState: CityState = {
  loading: false,
  list: [],
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityListFail(state) {},
  },
});

// Action
export const cityActions = citySlice.actions;

// Selectors
export const selectCitySlice = (state: RootState) => state.cities;

export const selectCityMap = createSelector(
  (state: RootState) => state.cities.list,
  (cityList) =>
    cityList.reduce((map: { [key: string]: City }, city) => {
      map[city.code] = city;
      return map;
    }, {})
);

export const selectCityOption = createSelector(
  (state: RootState) => state.cities.list,
  (cityList) =>
    cityList.map((city) => ({
      label: city.name,
      value: city.code,
    }))
);
// Reducer
export const cityReducer = citySlice.reducer;

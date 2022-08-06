import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { cityActions } from "../city/citySlice";

interface Props {}

export const Students = (props: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);
  return <Outlet />;
};

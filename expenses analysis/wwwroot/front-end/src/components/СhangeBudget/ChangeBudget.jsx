import React, { useState, useEffect, useContext } from "react";
import SimpleLineChart from "../Diagrams/TestDiagram";
import { MainData, selectAuthorization } from "../../store/dataSelectors";
import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { changeBudgetDataFromApiAction } from '../../store/DataReducer';

let ChangeBudget = () => {
  const dispatch = useDispatch();

  let dataArr = useSelector(state => state.DataReducer.dataArr)
    

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    dataArr.budget = Number(data.budget);
    dispatch(changeBudgetDataFromApiAction(dataArr))
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <h2 className="login-header">Змінна бюджета</h2>
      <label>
        <input
          type="text"
          {...register("budget", {
          })}
        />
      </label>
      <input type="submit" />
    </form>
  );
};
export default ChangeBudget;

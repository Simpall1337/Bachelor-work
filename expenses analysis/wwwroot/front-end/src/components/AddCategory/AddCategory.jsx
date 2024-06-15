import React, { useState, useEffect, useContext } from "react";
import SimpleLineChart from "../Diagrams/TestDiagram";
import { MainData, selectAuthorization } from "../../store/dataSelectors";
import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addExpensesDataFromApiAction, changeBudgetDataFromApiAction } from "../../store/DataReducer";
import Category from "../Category/Category";

let AddCategory = () => {
  const dispatch = useDispatch();

  let dataArr = useSelector((state) => state.DataReducer.dataArr);
  let category = useSelector((state) => state.DataReducer.category);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log()
    console.log(data);
    let obj = {
      category : data.category,
      amout_money : data.amout_money,
      date : data.date,
      description : data.description,
      id_User : dataArr.id_User
    }
    console.log(dataArr);
    console.log(obj)
    dispatch(addExpensesDataFromApiAction(obj))
    reset();
  };
  const itemInfoDel = () =>{
    console.log("s")
  };
  return (
    <div  className="login-form">
      <h2 className="login-header">Додати витрату</h2>
    <form onSubmit={handleSubmit(onSubmit) } >
    <label>
    <select {...register("category", {})} className="select-field">
      {category.map((cat, index) => (
        <option key={index} value={cat}>
          {cat}
        </option>
      ))}
    </select>
    </label>
    <label>
      Сумма витрати:
      <input type = "text"
        {...register('amout_money')}
      />
    </label>
    <label>
      Дата:
      <input type = "date"
        {...register('date')}
      />
    </label>
    <label>
      Опис:
      <input type = "text"
        {...register('description')}
      />
    </label>
    <input type="submit" value="Відправити" />
    </form>
    </div>
  );
};
export default AddCategory;

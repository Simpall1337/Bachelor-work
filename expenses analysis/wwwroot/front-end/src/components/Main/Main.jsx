import React, { useState, useEffect, useContext } from "react";
import SimpleLineChart from "../Diagrams/TestDiagram";
import { MainData, selectAuthorization } from "../../store/dataSelectors";
import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";
import { useDispatch, useSelector } from "react-redux";
import ChangeBudget from "../СhangeBudget/ChangeBudget";
import AddCategory from "../AddCategory/AddCategory";
import InfoYear from "../InfoYear/InfoYear";
import { useForm } from 'react-hook-form';
import PickYear from "../PickYear/PickYear";
import InfoMonth from "../InfoMonth/InfoMonth";
import './Main.css'
import { redirect, useNavigate } from "react-router-dom";
let Main = () => {

  const navigate = useNavigate();
  let budget = useSelector(state => state.DataReducer.dataArr.budget);
  let data = useSelector(state => state.DataReducer.dataArr.expenses);
  const [isView, setIsView] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [isBudget, setIsBudget] = useState(false);

  const { register, handleSubmit, watch } = useForm();
  const selectedYear = watch('year');
  const selectedMonth = watch('month');

  const years = [2020, 2021, 2022, 2023, 2024];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const onSubmit = (data) => {
      console.log('Selected Year:', data.year);
      console.log('Selected Month:', data.month);
  };

  const changeBudget = () =>{
    setIsBudget(true)
    setIsCategory(false)
    setIsView(true)
    console.log("ahahha");
  }
  const addAnalyz = () =>{

    navigate('/analyz');

    console.log("ahahha");
  }
  const changeBudgetBack = () => {
    setIsBudget(false)
    setIsCategory(false)
    setIsView(false)
  }
  const addCategory = () =>{
    setIsBudget(false)
    setIsCategory(true)
    setIsView(true)
  }
  return (
    <div>
      {budget && (
        <>
          <div
            style={{
              fontSize: "24px",
              textAlign: "center",
              fontWeight: "bold",
              color: "grey",
            }}
          >
            Ваш бюджет : {budget}
          </div>

          {isBudget && (
            <div>
              <ChangeBudget />
              <button
                className="login-form-button-change"
                onClick={changeBudgetBack}
              >
                Назад
              </button>
            </div>
          )}
          {!isView && (
            <div>
               <PickYear/>
              <div className="container">
                <InfoYear className="text" />
                <SimpleLineChart data={data} className="grafik" />
                <InfoMonth className="text" />
              </div>
                <button
                  className="login-form-button-change"
                  onClick={addCategory}>
                  Додати витрату
                </button>
                
                <button
                className="login-form-button-change"
                onClick={changeBudget}>
                Змінити бюджет
              </button>

              <button
                  className="login-form-button-change"
                  onClick={addAnalyz}>
                  Аналіз
              </button>
            </div>
          )}
          {isCategory && (
            <div>
              <AddCategory />
              <button
                className="login-form-button-change"
                onClick={changeBudgetBack}
              >
                Назад
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Main;

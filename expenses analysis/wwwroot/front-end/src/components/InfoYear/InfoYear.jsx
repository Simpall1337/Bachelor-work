import React, { useState, useEffect, useContext } from "react";
import SimpleLineChart from "../Diagrams/TestDiagram";
import { MainData, selectAuthorization } from "../../store/dataSelectors";
import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";
import { useDispatch, useSelector } from "react-redux";
import ChangeBudget from "../СhangeBudget/ChangeBudget";
import AddCategory from "../AddCategory/AddCategory";

let InfoYear = () => {
let infoYear = useSelector(state => state.DataReducer.yearArr)
console.log()
let categoryItems = "";

if (infoYear && infoYear.categoryCounts) {
 // categoryItems = [];
  infoYear.categoryCounts.forEach((element, index) => {
    categoryItems += " "+ element
  });
}
  return (
    <div>
      { infoYear && <div className="text">
        <div>Кількість витрат за рік: {infoYear.countExpenses}</div>
        <div>Загальна сума витрат за рік: {infoYear.sumExpenses}</div>
        <div>Найбільша витрата за рік: {infoYear.maxExpenses}</div>
        <div>Найбільше витрат по катигорії: {infoYear.maxCategory}</div> 
        <div>Всі використані категорії:{categoryItems}</div>
      </div>
      }
      
    </div>
  );
};
export default InfoYear;

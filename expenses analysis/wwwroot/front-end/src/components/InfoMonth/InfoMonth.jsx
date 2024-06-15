import React, { useState, useEffect, useContext } from "react";
import SimpleLineChart from "../Diagrams/TestDiagram";
import { MainData, selectAuthorization } from "../../store/dataSelectors";
import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";
import { useDispatch, useSelector } from "react-redux";
import ChangeBudget from "../СhangeBudget/ChangeBudget";
import AddCategory from "../AddCategory/AddCategory";

let InfoMonth = () => {
let InfoMonth = useSelector(state => state.DataReducer.monthArr)
console.log()
let categoryItems = "";

if (InfoMonth && InfoMonth.categoryCounts) {
 // categoryItems = [];
  InfoMonth.categoryCounts.forEach((element, index) => {
    categoryItems += " "+ element
  });
}
  return (
    <div>
      { InfoMonth && <div className="text">
        <div>Кількість витрат за місяць: {InfoMonth.countExpenses}</div>
        <div>Загальна сума витрат за місяць: {InfoMonth.sumExpenses}</div>
        <div>Найбільша витрата за місяць: {InfoMonth.maxExpenses}</div>
        <div>Найбільше витрат по катигорії: {InfoMonth.maxCategory}</div> 
        <div>Всі використані категорії:{categoryItems}</div>
      </div>
      }
      
    </div>
  );
};
export default InfoMonth;

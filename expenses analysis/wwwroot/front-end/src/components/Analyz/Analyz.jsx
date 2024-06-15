
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalyzDataFromApiAction, loginDataFromApiAction } from '../../store/DataReducer';
//import HeaderCss from './Header.module.css';
//import { loginDataFromApiAction } from ''
import { useNavigate } from 'react-router-dom';
import './Analyz.css'; // Подключаем CSS файл
import { useState, useEffect, useContext } from "react";

export let Analyz = (props) => {

    let dispatch = useDispatch();

    let dataArr = useSelector(state => state.DataReducer.dataArr)
    let dataAnalyz = useSelector(state => state.DataReducer.dataAnalyz)
    const months = [
        { value: '1', label: 'Січень' },
        { value: '2', label: 'Лютий' },
        { value: '3', label: 'Березень' },
        { value: '4', label: 'Квітень' },
        { value: '5', label: 'Травень' },
        { value: '6', label: 'Червень' },
        { value: '7', label: 'Липень' },
        { value: '8', label: 'Сервень' },
        { value: '9', label: 'Вересень' },
        { value: '10', label: 'Жовтень' },
        { value: '11', label: 'Листопад' },
        { value: '12', label: 'Грудень' },
      ];
    
      const years = [
        { value: 2022, label: '2022' },
        { value: 2023, label: '2023' },
        { value: 2024, label: '2024' },
      ];

      const [selectedMonth, setSelectedMonth] = useState('');
      const [selectedYear, setSelectedYear] = useState('');
      const [errorMessage, setErrorMessage] = useState('');

      const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        setErrorMessage('');
      };
    
      const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
        setErrorMessage('');
      };
    
      const handleButtonClick = () => {
        if (!selectedMonth || !selectedYear) {
          setErrorMessage('Оберіть місяць та рік!!!');
          return;
        }
        console.log(selectedMonth)
        console.log(selectedYear)
        console.log(dataArr)
        let obj = {
            id_User : dataArr.id_User,
            month : selectedMonth,
            year : selectedYear,
        }
        console.log(obj)
        
        dispatch(getAnalyzDataFromApiAction(obj))
        // Здесь можно вызвать нужный вам метод
        // например:
        // вашМетод(selectedMonth, selectedYear);
      };
console.log(dataAnalyz)
  return (
    <div className="con">
      <h1>Аналіз витрат</h1>
      <div className="dropdown-container">
        <select
          className="dropdown"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="">Оберіть місяць</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>

        <select
          className="dropdown"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="">Оберіть рік</option>
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button className="button" onClick={handleButtonClick}>
        Пошук
      </button>
      { dataAnalyz &&
      <div className="container"> 
      <div ><p className="paragraph">{dataAnalyz.countCategory}</p></div>
      <div ><p className="paragraph">{dataAnalyz.countExpensesText}</p></div>
      <div ><p className="paragraph">{dataAnalyz.sumExpensesText}</p></div>
      </div>
      }
    </div>
  );
}

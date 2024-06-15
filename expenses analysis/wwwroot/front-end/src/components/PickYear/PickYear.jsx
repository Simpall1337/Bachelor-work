import React, { useState, useEffect, useContext } from "react";
import SimpleLineChart from "../Diagrams/TestDiagram";
import { MainData, selectAuthorization } from "../../store/dataSelectors";
import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";
import { useDispatch, useSelector } from "react-redux";
import ChangeBudget from "../СhangeBudget/ChangeBudget";
import AddCategory from "../AddCategory/AddCategory";
import InfoYear from "../InfoYear/InfoYear";
import { useForm } from 'react-hook-form';
import { addExpensesDataFromApiAction, findYearDataFromApiAction } from "../../store/DataReducer";
import './PickYear.css'

let PickYear = () => {
    let dispatch = useDispatch();

    let dataArr = useSelector(state => state.DataReducer.dataArr)

    const months = [
        { value: '1', label: 'Январь' },
        { value: '2', label: 'Февраль' },
        { value: '3', label: 'Март' },
        { value: '4', label: 'Апрель' },
        { value: '5', label: 'Май' },
        { value: '6', label: 'Июнь' },
        { value: '7', label: 'Июль' },
        { value: '8', label: 'Август' },
        { value: '9', label: 'Сентябрь' },
        { value: '10', label: 'Октябрь' },
        { value: '11', label: 'Ноябрь' },
        { value: '12', label: 'Декабрь' },
      ];
    
      const years = [
        { value: 2022, label: '2022' },
        { value: 2023, label: '2023' },
        { value: 2024, label: '2024' },
        // Добавьте другие годы по вашему усмотрению
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
          setErrorMessage('Пожалуйста, выберите и месяц, и год.');
          return;
        }
        console.log(selectedMonth)
        console.log(selectedYear)
        console.log(dataArr)
        let obj = {
            login : dataArr.id_User,
            month : selectedMonth,
            year : selectedYear,
        }
        dispatch(findYearDataFromApiAction(obj))
        // Здесь можно вызвать нужный вам метод
        // например:
        // вашМетод(selectedMonth, selectedYear);
      };
    
      return (
        <div className="con">
      <div className="dropdown-container">
        <select className="dropdown" value={selectedMonth} onChange={handleMonthChange}>
          <option value="">Оберіть місяць</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>

        <select className="dropdown" value={selectedYear} onChange={handleYearChange}>
          <option value="">Оберіть рік</option>
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button className="button" onClick={handleButtonClick}>Пошук</button>
    </div>
        
      );
    }

export default PickYear;

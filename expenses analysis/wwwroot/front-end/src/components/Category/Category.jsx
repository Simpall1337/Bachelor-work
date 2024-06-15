import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import LineDiagram from "../Diagrams/LineDiagram";
import { deleteDataFromApiAction,updateDataFromApiAction } from '../../store/DataReducer';
import { useForm } from 'react-hook-form';
import './Category.css'

let Category = () => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [isView, setIsView] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);

  let dataArr = useSelector(state => state.DataReducer.dataArr)
  let data = useSelector(state => state.DataReducer.dataArr.expenses);
  let category = useSelector((state) => state.DataReducer.category);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur"
  });

  const onSubmit = (data) => {
  console.log("onSubmit")
    reset();
    let obj = {
      id_Expenses : currentItem , 
      amout_money : data.amout_money !== "" ? data.amout_money : dataArr.expenses.find(entry => entry.id_Expenses === currentItem).amout_money,
      category : data.category !== "" ? data.category : dataArr.expenses.find(entry => entry.id_Expenses === currentItem).category,
      date : data.date !== "" ? data.date : dataArr.expenses.find(entry => entry.id_Expenses === currentItem).date,
      description : data.description !== "" ? data.description : dataArr.expenses.find(entry => entry.id_Expenses === currentItem).description,
    }
    try {
      dispatch(updateDataFromApiAction(obj))
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };



  const queryParams = new URLSearchParams(window.location.search);
  const categoryParam = queryParams.get("category");


  const filterByCategory = (data, categories) => {
    return data.filter((item) => categories.includes(item.category));
  };

  const filteredData = filterByCategory(data, categoryParam);
  
  function removeTimePart(dataArray) {
    return dataArray.map((item) => {
      return {
        ...item,
        date: item.date.replace("T00:00:00", ""),
      };
    });
  }

  const updatedArray = removeTimePart(filteredData);

  const handleDelete = (index) => {
    dispatch(deleteDataFromApiAction(index))
  };

  const handleEdit = (index) => {
    console.log(index)
    setCurrentItem(index);
    setIsEditing(true); 
    setIsView(false);
  };
  const itemInfoDel = () =>{
    setIsEditing(false); 
    setIsView(true);
    console.log("s")
  };

  return (
    <div className="category-container">
      <div>Категорія : {categoryParam}</div>
      <LineDiagram data={updatedArray} />
      {isView && (<table className="category-table">
        <thead>
          <tr>
            <th>Дата витрати</th>
            <th>Сумма витрати</th>
            <th>Опис витрати</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {updatedArray.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.amout_money}</td>
              <td>{item.description}</td>
              <td>
                <button onClick={() => handleDelete(item.id_Expenses)}>
                  Видалити
                </button>
                <button onClick={() => handleEdit(item.id_Expenses)}>Змінити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> )}
      {isEditing && (
        <div  className="login-form">
        <form onSubmit={handleSubmit(onSubmit) } >
        <label>
          Категорія:
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
        <button onClick={itemInfoDel} className="login-form-button">Назад</button>
        
        </div>
          )}
        
    </div>
  );
};

export default Category;

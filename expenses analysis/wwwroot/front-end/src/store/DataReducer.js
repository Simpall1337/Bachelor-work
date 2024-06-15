import axios from "axios";
import { act } from "react";
import Notiflix from 'notiflix';

let defaultState = {
    dataArr: [],
    yearArr : [],
    monthArr : [],
    name : "Login/Register",
    authenticated : false,
    errorMessage : false,
    category : [],
    message : ""
  };

const GET_DATA_FROM_API = "GET_DATA_FROM_API";
const LOGIN_DATA_FROM_API = "LOGIN_DATA_FROM_API";
const GET_DELETE_DATA_FROM_API = "GET_DELETE_DATA_FROM_API";
const UPDATE_DATA_FROM_API = "UPDATE_DATA_FROM_API";
const GET_CATEGORY_DATA_FROM_API = "GET_CATEGORY_DATA_FROM_API"
const GET_YEAR_DATA_FROM_API = "GET_YEAR_DATA_FROM_API"
const GET_MONTH_DATA_FROM_API = "GET_MONTH_DATA_FROM_API"
const GET_ANALYZ_DATA_FROM_API = "GET_ANALYZ_DATA_FROM_API"
export const DataReducer = (state = defaultState, action) => {
 
    switch (action.type) {
      case GET_DATA_FROM_API: {
        return {...state, dataArr: action.payload.data
           };
        }
        case GET_ANALYZ_DATA_FROM_API:{
          return {...state, dataAnalyz : action.payload.data};
        }
        case GET_YEAR_DATA_FROM_API:{
          return{...state, yearArr: action.payload.data
          };
        }
        case GET_MONTH_DATA_FROM_API:{
          return{...state, monthArr: action.payload.data};
        }
        case GET_DELETE_DATA_FROM_API: {
          const updatedDataArr = state.dataArr.expenses.filter(obj => obj.id_Expenses !== action.payload);
          
          const newArr = {
            budget : state.dataArr.budget,
            expenses : updatedDataArr
          }
          return {...state, dataArr: newArr 
             };
          }
          case GET_CATEGORY_DATA_FROM_API: {
            console.log(action.payload);
            return {...state, category: action.payload 
            };
          }
        case LOGIN_DATA_FROM_API:{
          let flag = false;
          
          if(action.payload.status === 200){
              flag = true
          }
          return {...state, name: action.payload.data.name + " " +action.payload.data.lastName ,
            authenticated : flag,
            message : action.payload,
          }
        }
        case UPDATE_DATA_FROM_API:{
          
          const updatedDataArr = state.dataArr.expenses.find(obj => obj.id_Expenses === action.payload.id_Expenses);
         
          if(updatedDataArr){
            updatedDataArr.category = action.payload.category;
            updatedDataArr.amout_money = action.payload.amout_money;
            updatedDataArr.date = action.payload.date;
            updatedDataArr.description = action.payload.description;
          }
          const newArr = {
            budget : state.dataArr.budget,
            expenses : state.dataArr.expenses
          }
          return {...state,
            dataArr: newArr
        } 
        }
        default:
            return state;
        }
      };

      export const getDataFromApi = (payload) => ({
        type: GET_DATA_FROM_API,
        payload,
      });
      export const getDeleteDataFromApi = (payload) => ({
        type: GET_DELETE_DATA_FROM_API,
        payload,
      });
      export const loginDataFromApi = (payload) => ({
        type: LOGIN_DATA_FROM_API,
        payload,
      });
      export const updateDataFromApi = (payload) => ({
        type: UPDATE_DATA_FROM_API,
        payload,
      });
      export const getCategoryDataFromApi = (payload) => ({
        type: GET_CATEGORY_DATA_FROM_API,
        payload,
      });
      export const getYearDataFromApi = (payload) => ({
        type: GET_YEAR_DATA_FROM_API,
        payload,
      });
      export const getMonthDataFromApi = (payload) => ({
        type: GET_MONTH_DATA_FROM_API,
        payload,
      });
      export const getAnalyzDataFromApi = (payload) => ({
        type: GET_ANALYZ_DATA_FROM_API,
        payload,
      });
      export const getDataFromApiAction = () => {
        return async function (dispatch) {
        let fetchResultEquipment = await axios.get('https://localhost:7023/api/Equipment')
          dispatch(getDataFromApi(fetchResultEquipment.data));
        };
      };
      

      export const loginDataFromApiAction = (obj) => {
        return async function (dispatch) {
          // throw expect
          console.log(obj)
          try {
            let fetchResultEquipment = await axios.get(`https://localhost:44323/user?login=${obj.login}&password=${obj.password}`)
            let id_User = fetchResultEquipment.data.id_User
            dispatch(loginDataFromApi(fetchResultEquipment));
            fetchResultEquipment = await axios.get(`https://localhost:44323/api/Analyz?login=${obj.login}`)
            dispatch(getDataFromApi(fetchResultEquipment));
            console.log(fetchResultEquipment)
            fetchResultEquipment = await axios.get(`https://localhost:44323/api/Category`)
            dispatch(getCategoryDataFromApi(fetchResultEquipment.data));
            fetchResultEquipment = await axios.get(`https://localhost:44323/api/Expenses/getYearExpenses?id_user=${id_User}&year=2024`)
            console.log(fetchResultEquipment)
            dispatch(getYearDataFromApi(fetchResultEquipment));
            fetchResultEquipment = await axios.get(`https://localhost:44323/api/Expenses/getMonthExpenses?id_User=${id_User}&month=5&year=2024`)
            console.log(fetchResultEquipment)
            dispatch(getMonthDataFromApi(fetchResultEquipment));
         } catch (error) {
          dispatch(loginDataFromApi(error.response.data));
         }
        //  dispatch(loginDataFromApi(fetchResultEquipment.data.name));

        };
      };

      export const getAnalyzDataFromApiAction = (obj) => {
        return async function (dispatch) {
          try {
            console.log(obj)
            let fetchResultEquipment = await axios.get(`https://localhost:44323/api/Analyz/getAnalyzAnalyz?id_User=${obj.id_User}&year=${obj.year}&month=${obj.month}`)
            console.log(fetchResultEquipment)
            dispatch(getAnalyzDataFromApi(fetchResultEquipment));
          } catch (error) {
            Notiflix.Notify.failure("Cталася помилка")
           // dispatch(loginDataFromApi(error.response.data));
          }
        }
      }

      export const deleteDataFromApiAction= (obj) => {
        return async function (dispatch) {
          try {
            let fetchResultEquipment = await axios.delete(`https://localhost:44323/api/Expenses?id=${obj}`)
            dispatch(getDeleteDataFromApi(obj));
          } catch (error) {
            Notiflix.Notify.failure("Cталася помилка")
           // dispatch(loginDataFromApi(error.response.data));
          }
        }
      }
      export const updateDataFromApiAction= (obj) => {
        return async function (dispatch) {
          try {
              console.log(obj)
              let fetchResultEquipment = await axios.patch(`https://localhost:44323/api/Expenses`,obj)
              dispatch(updateDataFromApi(obj));
            
          } catch (error) {
            if(error.response.request.status == 400){
              Notiflix.Notify.failure("Не правильні данні")
            }
            else{
              Notiflix.Notify.failure("Сервер не відповідає status: " + error.response.request.status)
            }
            console.log(error.message)
          }
        }
      }

      export const changeBudgetDataFromApiAction = (obj) => {
        return async function (dispatch) {
          try {
            console.log(obj)
            let fetchResultEquipment = await axios.patch(`https://localhost:44323/api/Budget?newBudget=${obj.budget}&idUser=${obj.id_User}`)
            let data = {
              data: obj
            }
            dispatch(getDataFromApi(data))

          } catch (error) {
            if(error.response.request.status == 400){
              Notiflix.Notify.failure("Не правильні данні")
            }
            else{
              Notiflix.Notify.failure("Сервер не відповідає status: " + error.response.request.status)
            }
          }
          
        }
      }

      export const addExpensesDataFromApiAction = (obj) =>{
        return async function(dispatch){
            try {
              console.log(obj.id_User)
              //delete obj.login
              
              let fetchResultEquipment = await axios.post(`https://localhost:44323/api/Expenses`,obj)
              fetchResultEquipment = await axios.get(`https://localhost:44323/api/Analyz/getUserExpensesById?id_User=${obj.id_User}`)
              console.log(fetchResultEquipment)
              dispatch(getDataFromApi(fetchResultEquipment))
            } catch (error) {
              console.log(error)
              if(error.response.request.status == 400){
                Notiflix.Notify.failure("Не правильні данні")
              }
              else{
                Notiflix.Notify.failure("Сервер не відповідає status: " + error.response.request.status)
              }
            }
        }
      }

      export const findYearDataFromApiAction = (obj) =>{
        return async function(dispatch){
            try {
             console.log(obj)
             let fetchResultEquipment = await axios.get(`https://localhost:44323/api/Expenses/getYearExpenses?id_User=${obj.login}&year=${obj.year}`)
             console.log(fetchResultEquipment)
             dispatch(getYearDataFromApi(fetchResultEquipment))
            fetchResultEquipment = await axios.get(`https://localhost:44323/api/Expenses/getMonthExpenses?id_User=${obj.login}&month=${obj.month}&year=${obj.year}`)
            console.log(fetchResultEquipment)
            dispatch(getMonthDataFromApi(fetchResultEquipment));
            } catch (error) {
              console.log(error)
              if(error.response.request.status == 400){
                Notiflix.Notify.failure("Немає даних")
              }
              else{
                Notiflix.Notify.failure("Сервер не відповідає status: " + error.response.request.status)
              }
            }
        }
      }
      




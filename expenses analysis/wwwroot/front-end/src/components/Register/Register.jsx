
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginDataFromApiAction } from '../../store/DataReducer';
//import HeaderCss from './Header.module.css';
//import { loginDataFromApiAction } from ''
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Подключаем CSS файл
import Notiflix from 'notiflix';
import axios from "axios";

export let Register = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur"
  });

  const onSubmit = (data) => {
    console.log(data)
    let obj = {
      id_User : 0,
      name : data.name,
      lastName : data.lastName,
      eMail : data.eMail,
      phone : data.phone,
      login : data.login,
      password : data.password,
    }
    console.log(obj);
    reset();
    
    try {
      
      let fetchResultEquipment = axios.post(`https://localhost:44323/user`,data)       
     // dispatch(loginDataFromApiAction(data));
      navigate('/login');
    } catch (error) {
      Notiflix.Notify.failure("Не правильні дані, або користувач з таким логіном вже існує!")
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
       <h2 className="login-header">Registration</h2>
      <label>
        Логін:
        <input type = "text"
        {...register('login',{
            required : "Поле обовязкове",
            minLength :{
              value : 5,
              message: "Mінімальна кількість символів логіну 5"
            }
          }
        )}
        />
      </label>
      <div>
        {errors?.login && <p>{errors?.login.message || "Error"}</p>}
      </div>
      <label>
        Пароль:
        <input  type = "password"
        {...register('password',{
            required : "Поле обовязкове",
            minLength :{
              value : 8,
              message: "Mінімальна кількість символів паролю 8"
            }
          }
        )}
        />
      </label>
      <div>
        {errors?.password && <p>{errors?.password.message || "Error"}</p>}
        <div className="error-message">{props.message}</div>
      </div>
      <label>
        Ім'я:
        <input type = "text"
        {...register('name',{
            required : "Поле обовязкове"
          }
        )}
        />
      </label>
      <label>
        Фамілія:
        <input type = "text"
        {...register('lastName',{
            required : "Поле обовязкове"
          }
        )}
        />
      </label>
      <label>
        E-mail:
        <input type = "text"
        {...register('eMail',{
            required : "Поле обовязкове"
          }
        )}
        />
      </label>
      <label>
        Телефон:
        <input type = "text"
        {...register('phone',{
            required : "Поле обовязкове"
          }
        )}
        />
      </label>

      

      <input type="submit" />
    </form>
  );
}

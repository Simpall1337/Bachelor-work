
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginDataFromApiAction } from '../../store/DataReducer';
//import HeaderCss from './Header.module.css';
//import { loginDataFromApiAction } from ''
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Подключаем CSS файл

export let Login= (props) => {
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
    reset();
    try {
      dispatch(loginDataFromApiAction(data));
     // navigate('/1337');
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
       <h2 className="login-header">Логін</h2>
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
      

      <input type="submit" />
    </form>
  );
}

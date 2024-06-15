import logo from './logo.svg';
import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login';
import RestrictedRoute from './components/Folders/RestrictedRouts';
import PrivateRoute from './components/Folders/PrivateRoute';
import Main from './components/Main/Main';
import Category from './components/Category/Category';
import { Register } from './components/Register/Register';
import { Analyz } from './components/Analyz/Analyz';

function App() {
const dispatch = useDispatch();

let dataArr = useSelector(state => state.DataReducer.dataArr)
let name = useSelector(state => state.DataReducer.name)
const authenticated = useSelector(state => state.DataReducer.authenticated);
let message = useSelector(state => state.DataReducer.message)
  return (
    <div>
       <Header 
       name = {name}
       authenticated = {authenticated}
       /> 
       <Routes>
       <Route
          path="/main"
          element={
            <PrivateRoute>
              <Main 
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute>
              <Login 
                message = {message}
              />
              </RestrictedRoute>
          }
        />
        <Route
          path="/reg"
          element={
            <RestrictedRoute>
              <Register 
                message = {message}
              />
              </RestrictedRoute>
          }
        />
          <Route
             path="/category"
             element={
               <PrivateRoute>
                <Category 
                />
               </PrivateRoute>
             }
           />
           <Route
          path="/analyz"
          element={
            <PrivateRoute>
              <Analyz/>
              </PrivateRoute>
          }
        />
        </Routes>
        
    </div>
  );
}

export default App;

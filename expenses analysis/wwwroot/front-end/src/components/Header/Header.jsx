
import React, { useState, useEffect,useContext,useSelector }from 'react';
import HeaderCss from './Header.css';
import { NavLink } from 'react-router-dom';

let Header = (props) => {
  console.log(props)

  return (
    <div className="header">
      <div className="header-left">
        <h1>Програмний застосунок аналізу особистих витрат користувача</h1>
      </div>
      <div className="header-right">
        {props.authenticated ? (
          <div>
            {props.name}
          </div>
        ) : (
          <div>
            <NavLink to={'/login'} className="header-link">
              Login
            </NavLink>
            <NavLink to={'/reg'} className="header-link">
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
export default Header;

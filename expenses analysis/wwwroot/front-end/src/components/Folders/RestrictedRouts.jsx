import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthorization } from '../../store/dataSelectors';
//import {selectAuthorization} from 

const RestrictedRoute = ({ children, redirectTo = '/main' }) => {
  const authenticated = useSelector(selectAuthorization);
  return authenticated ? <Navigate to={redirectTo} replace /> : children;
};

export default RestrictedRoute;
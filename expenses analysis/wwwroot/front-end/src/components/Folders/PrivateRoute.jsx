import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthorization } from '../../store/dataSelectors';

const PrivateRoute = ({ children, redirectTo = '/login' }) => {
  const authenticated = useSelector(selectAuthorization);
  return authenticated ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
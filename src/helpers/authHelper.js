import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkout, isAuthGuardActive } from '../constants/defaultValues';
import { getCurrentUser } from './Utils';

const ProtectedRoute = ({ path, viewComponent: ViewComponent }) => {
  const currentUser = getCurrentUser();
  console.log(getCurrentUser());
  

  return currentUser ? (
    <Route exact path={path} render={(props) => <ViewComponent {...props} />}
  />

  ) : (
    <Redirect to="/detailCart" />
  );
};

export default ProtectedRoute; 


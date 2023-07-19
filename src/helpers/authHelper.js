import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkout, isAuthGuardActive, addCart } from '../constants/defaultValues';
import { getCurrentUser } from './Utils';
import DetailCart from '../components/cart/detailCart.tsx';

const ProtectedRoute = ({ path, viewComponent: ViewComponent }) => {
  const currentUser = getCurrentUser();
  console.log(getCurrentUser());
  

  return currentUser ? (
    <Route exact path={path} render={(props) => <ViewComponent {...props} />}/>

  ) : (
    <Redirect to= "/" />
  );
};

export default ProtectedRoute; 


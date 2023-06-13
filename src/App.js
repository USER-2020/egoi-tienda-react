/* eslint-disable no-unused-vars */
import React, { Suspense, useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import AppLocale from '../src/lang';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { isMultiColorActive, adminRoot, UserRole, checkout, addCart } from './constants/defaultValues.js';
import  ProtectedRoute  from './helpers/authHelper';
import { getCurrentUser } from './helpers/Utils';
import { ModalBody, Modal } from 'reactstrap';
import Login from "./views/user/login.js";



// const ViewLogin = React.lazy(()=>import(/* webpackChunkName: "views" */ './views/user/userRoute'));

const ViewDetailProduct = React.lazy(() => import(/* webpackChunkName: "views" */ './views/detailsProduct'));
const ViewDetailCartAddress = React.lazy(() => import(/* webpackChunkName: "views" */ './views/checkout/addressCart'));
const ViewDetailCart = React.lazy(() => import(/* webpackChunkName: "views" */ './views/cartShopping'));
const ViewCategory = React.lazy(() => import(/* webpackChunkName: "views" */ './views/category'));
const ViewHome = React.lazy(() => import(/* webpackChunkName: "views" */ './views/home'));
const ViewApp = React.lazy(() => import(/* webpackChunkName: "views-app" */ './views/app'));
const ViewUser = React.lazy(() => import(/* webpackChunkName: "views-user" */ './views/user'));
const ViewError = React.lazy(() => import(/* webpackChunkName: "views-error" */ './views/error'));
const ViewUnauthorized = React.lazy(() => import(/* webpackChunkName: "views-error" */ './views/unauthorized'));


const App = (props) => {
  const { locale } = props;

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const currenUser = getCurrentUser();
  

  const handleLogin = () => {
    // Code to handle user login, such as storing session storage, etc.
    if(currenUser){
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }

  };

 

  return (
    <div className="h-100">
      <Suspense fallback={<div className="loading" />}>
        <IntlProvider locale={locale} messages={AppLocale[locale]}>
          <Router>
            <Switch>
              {/* <Route path="/user/login" exact render={(props)=> <ViewLogin {...props} />}/> */}
              <Route path="/error" exact render={(props) => <ViewError {...props} />} />
              <Route path="/unauthorized" exact render={(props) => <ViewUnauthorized {...props} />} />
              <Route path="/" exact render={(props) => <ViewHome {...props} />} />
              <Route path="/products/:name" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/categories/:category/:subcategory/:id" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/brand/:brand/:brandId" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/detailsProduct/:id/:slug" exact render={(props) => <ViewDetailProduct {...props} />} />
              <ProtectedRoute path={checkout} viewComponent={ViewDetailCartAddress} />
              <ProtectedRoute path={addCart} viewComponent={ViewDetailCart}/>
              <Redirect to="/error" />
            </Switch>
          </Router>
        </IntlProvider>
      </Suspense>
    </div>
  );
};

const mapStateToProps = ({ authUser, settings }) => {
  const { currentUser } = authUser;
  const { locale } = settings;
  return { currentUser, locale };
};

export default App;

/* eslint-disable no-unused-vars */
import React, { Suspense, useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import AppLocale from '../src/lang';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { isMultiColorActive, adminRoot, UserRole, checkout, addCart, myorders, thankYouForPay } from './constants/defaultValues.js';
import ProtectedRoute from './helpers/authHelper';
import { getCurrentUser } from './helpers/Utils';
import { ModalBody, Modal } from 'reactstrap';
import Login from "./views/user/login.js";



// const ViewLogin = React.lazy(()=>import(/* webpackChunkName: "views" */ './views/user/userRoute'));
const ViewMyOrders = React.lazy(() => import(/* webpackChunkName: "views" */ './views/myOrders'));
const ViewDetailProduct = React.lazy(() => import(/* webpackChunkName: "views" */ './views/detailsProduct'));
const ViewDetailCartAddress = React.lazy(() => import(/* webpackChunkName: "views" */ './views/checkout/addressCart'));
const ViewDetailCart = React.lazy(() => import(/* webpackChunkName: "views" */ './views/cartShopping'));
const ViewCategory = React.lazy(() => import(/* webpackChunkName: "views" */ './views/category'));
const ViewHome = React.lazy(() => import(/* webpackChunkName: "views" */ './views/home'));
const ViewApp = React.lazy(() => import(/* webpackChunkName: "views-app" */ './views/app'));
const ViewUser = React.lazy(() => import(/* webpackChunkName: "views-user" */ './views/user'));
const ViewError = React.lazy(() => import(/* webpackChunkName: "views-error" */ './views/error'));
const ViewUnauthorized = React.lazy(() => import(/* webpackChunkName: "views-error" */ './views/unauthorized'));
const ViewPoliticasPrivacidad = React.lazy(() => import(/* webpackChunkName: "views" */'./views/politicaPrivacidad'));
const ViewTerminosCondiciones = React.lazy(() => import(/* webpackChunkName: "views" */'./views/terminosYCondiciones'));
const ViewFAQ = React.lazy(() => import(/* webpackChunkName: "views" */'./views/FAQ'));
const ViewSobreNosotros = React.lazy(() => import(/* webpackChunkName: "views" */ './views/sobreNosotros'));
const ViewContactanos = React.lazy(() => import(/* webpackChunkName: "views" */ './views/contactanos'));
const ViewMantenince = React.lazy(() => import(/* webpackChunkName: "views" */  './views/mantenince'));
const ViewAllBrands = React.lazy(() => import(/* webpackChunkName: "views" */ './views/allBrands'));
const ViewAllCategories = React.lazy(() => import(/* webpackChunkName: "views" */ './views/allCategories'));
const ViewThankYouForPay = React.lazy(() => import(/* webpackChunkName: "views" */ './views/thankyouforpay'));
const ViewRecoveryPassword = React.lazy(() => import(/* webpackChunkName: "views" */ './views/passwordRecovery'));
const ViewRecoveryPasswordNew = React.lazy(() => import(/* webpackChunkName: "views" */ './views/passwordNewPassword'));


function DynamicTitle() {
  const location = useLocation();
  const routeName = location.pathname.replace('/', '');

  useEffect(() => {
    if (routeName === '') {
      document.title = 'Egoi';

    } else {

      document.title = `Egoi - ${routeName}`;
    }
  }, [routeName]);

  useEffect(() => {
    const handlePopstate = () => {
      // Obtener la parte de la ruta antes de la almohadilla
      const routeBeforeHash = window.location.pathname;

      // Forzar un refresh solo si la ruta antes de la almohadilla cambia
      if (routeBeforeHash !== location.pathname && !location.hash) {
        window.location.reload();
      }
    };

    // Agregar el evento popstate al cargar el componente
    window.addEventListener('popstate', handlePopstate);

    // Remover el evento popstate al desmontar el componente
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [location.pathname, location.hash]);

  return null; // No renderizar nada en este componente


}


const App = (props) => {
  const { locale } = props;

  // const location = useLocation();
  // const routeName = location.pathname.replace('/', '')

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const currenUser = getCurrentUser();


  const handleLogin = () => {
    // Code to handle user login, such as storing session storage, etc.
    if (currenUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

  };

  // useEffect(() => {
  //   document.title = `React App - ${routeName}`;
  // }, [routeName]);


  return (
    <div className="h-100">
      <Suspense fallback={<div className="loading" />}>
        <IntlProvider locale={locale} messages={AppLocale[locale]}>
          <Router basename={process.env.PUBLIC_URL}>
            <Route component={DynamicTitle} />
            <Switch>
              {/* <Route path="/user/login" exact render={(props)=> <ViewLogin {...props} />}/> */}
              <Route path="/error" exact render={(props) => <ViewError {...props} />} />
              <Route path="/unauthorized" exact render={(props) => <ViewUnauthorized {...props} />} />
              <Route path="/termsAndConditions" exact render={(props) => <ViewTerminosCondiciones {...props} />} />
              <Route path="/privacyPolicy" exact render={(props) => <ViewPoliticasPrivacidad {...props} />} />
              <Route path="/faq" exact render={(props) => <ViewFAQ {...props} />} />
              <Route path="/aboutUs" exact render={(props) => <ViewSobreNosotros {...props} />} />
              <Route path="/contactUs" exact render={(props) => <ViewContactanos {...props} />} />
              <Route path="/" exact render={(props) => <ViewHome {...props} />} />
              {/* <Route path="/" exact render={(props) => <ViewMantenince {...props} />} /> */}
              <Route path="/products/:name" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/recovery" exact render={(props) => <ViewRecoveryPassword {...props} />} />
              <Route path="/recoverypassword/:email/:token" exact render={(props) => <ViewRecoveryPasswordNew {...props} />} />
              {/* <Route path="/recoverypassword" exact render={(props) => <ViewRecoveryPasswordNew {...props} />} /> */}
              <Route path="/categories/:category/:subcategory/:id" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/categories/:category/:subcategory/:id/:tag" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/categories/products/:subcategory/:id/:subcate/:subsubcate" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/categories/products/:subcategory/:id/:tag/:subcate/:subsubcate" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/discountedProducts" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/recentlySeen" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/addRecently" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/promotions" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/bestSellers" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/topRated" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/topFeatured" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/allBrands" exact render={(props) => <ViewAllBrands {...props} />} />
              <Route path="/allCategories" exact render={(props) => <ViewAllCategories {...props} />} />
              <Route path="/brand/:brand/:brandId" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/brand/:brand/:brandId/:tag" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/detailsProduct/:id/:slug" exact render={(props) => <ViewDetailProduct {...props} />} />
              <Route path="/detailsProduct/:id/:slug/:tag" exact render={(props) => <ViewDetailProduct {...props} />} />
              <Route path={addCart} exact render={(props) => <ViewDetailCart {...props} />} />
              <Route path={checkout} exact render ={(props) => <ViewDetailCartAddress {...props}/>}/>
              <ProtectedRoute path={myorders} viewComponent={ViewMyOrders} />
              <ProtectedRoute path={thankYouForPay} viewComponent={ViewThankYouForPay} />
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

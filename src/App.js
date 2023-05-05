/* eslint-disable no-unused-vars */
import React, { Suspense, useContext } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import AppLocale from '../src/lang';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { isMultiColorActive, adminRoot, UserRole } from './constants/defaultValues';
import { ProtectedRoute } from './helpers/authHelper';

const ViewDetailProduct = React.lazy(() => import(/* webpackChunkName: "views" */ './views/detailsProduct'));
const ViewCategory = React.lazy(() => import(/* webpackChunkName: "views" */ './views/category'));
const ViewHome = React.lazy(() => import(/* webpackChunkName: "views" */ './views/home'));
const ViewApp = React.lazy(() => import(/* webpackChunkName: "views-app" */ './views/app'));
const ViewUser = React.lazy(() => import(/* webpackChunkName: "views-user" */ './views/user'));
const ViewError = React.lazy(() => import(/* webpackChunkName: "views-error" */ './views/error'));
const ViewUnauthorized = React.lazy(() => import(/* webpackChunkName: "views-error" */ './views/unauthorized'));

const App = (props) => {
  const { locale } = props;

  return (
    <div className="h-100">
      <Suspense fallback={<div className="loading" />}>
        <IntlProvider locale={locale} messages={AppLocale[locale]}>
          <Router>
            <Switch>
              <ProtectedRoute path={adminRoot} component={ViewApp} roles={[UserRole.Admin, UserRole.Editor]} />
              <Route path="/user" render={(props) => <ViewUser {...props} />} />
              <Route path="/error" exact render={(props) => <ViewError {...props} />} />
              <Route path="/unauthorized" exact render={(props) => <ViewUnauthorized {...props} />} />
              <Route path="/" exact render={(props) => <ViewHome {...props} />} />
              {/* <Route path="/categories" exact render={(props) => <ViewCategory {...props} />} /> */}
              <Route path="/categories/:category/:subcategory/:id" exact render={(props) => <ViewCategory {...props} />} />
              <Route path="/detailsProduct/:slug" exact render={(props) => <ViewDetailProduct {...props} />} />
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

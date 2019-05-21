import React, { PureComponent } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import HomePage from './Main/HomePage/Main';
import SignInPage from './Main/Authorization/SignInPage';
import SignUpPage from './Main/Authorization/RegistrationPage';
import Organizations from './Organizations';
import Organization from './Organizations/OrganizationPage';
import Profile from './Main/Profile';
import Notfound from './StatusPages/NotFound';
import MainHeader from './Main/MainHeader';
import { AuthProvider } from './Main/AuthContext';
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

class AppRouter extends PureComponent {

  render = () => (
    <Router>
      <AuthProvider>
        <MainHeader />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PublicRoute path="/sign-in" component={SignInPage} />
          <PublicRoute path="/sign-up" component={SignUpPage} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/organizations/:id" component={Organization} />
          <ProtectedRoute path="/organizations" component={Organizations} />
          <Route component={Notfound} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default AppRouter;
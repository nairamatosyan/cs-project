import React, { PureComponent } from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import HomePage from './Main/HomePage/Main';
import SignInPage from './Main/Authorization/SignInPage';
import SignUpPage from './Main/Authorization/RegistrationPage';
import Organizaions from './Organizations';
import Profile from './Main/Profile';
import Notfound from './StatusPages/NotFound';
import MainHeader from './Main/MainHeader';

class AppRouter extends PureComponent {

  render = () => (
    <Router>
      <MainHeader />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/profile" component={Profile} />
        <Route path="/organizations" component={Organizaions} />
        <Route component={Notfound} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
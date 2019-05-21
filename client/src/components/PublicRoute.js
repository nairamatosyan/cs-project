import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from './Main/AuthContext';

const PublicRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuth }) => (
      <Route
        render={
          props =>
            isAuth 
            ? null
            : <Component {...props} /> 
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default PublicRoute;
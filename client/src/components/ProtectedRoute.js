import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from './Main/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuth }) => (
      <Route
        render={
          props =>
            isAuth 
            ? <Component {...props} /> 
            : <Redirect to="/sign-in" />
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default ProtectedRoute;
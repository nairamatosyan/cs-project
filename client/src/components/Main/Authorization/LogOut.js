import React from 'react';
import { withRouter } from 'react-router-dom';
import { emptyState } from '../../../config/localStorage';
import { AuthConsumer } from '../../Main/AuthContext';

function logOutButton(props) {
  const logOut = (logout) => {
    logout();
    emptyState();
    props.history.push('/');
  }
  return (
    <AuthConsumer>
      {({ isAuth, login, logout }) => (<div onClick={() => logOut(logout)}>Log Out</div>)}
    </AuthConsumer>);
}

export default withRouter(logOutButton);

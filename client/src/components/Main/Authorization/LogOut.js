import React from 'react';
import { withRouter } from 'react-router-dom';

function logOutButton(props) {
  const logOut = (onSignOut) => {
    // onSignOut();
    props.history.push('/');
  }
  return (<div onClick={() => logOut()}>Log Out</div>);
}

export default withRouter(logOutButton);

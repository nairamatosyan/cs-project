import React from 'react';
import { withRouter } from 'react-router-dom';
import { emptyState } from '../../../config/localStorage' 

function logOutButton(props) {
  const logOut = () => {
    emptyState();
    props.history.push('/');
  }
  return (<div onClick={() => logOut()}>Log Out</div>);
}

export default withRouter(logOutButton);

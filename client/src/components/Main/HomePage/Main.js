import React from 'react';

import { Margin, Padding } from 'styled-components-spacing';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Row,
  Typography,
} from 'antd';

const homePage = (props) => {
  const signIn = () => {
    props.history.push('/sign-in');
  }
  const signUp = () => {
    props.history.push('/sign-up');
  }
  return (
    <React.Fragment>
      <Margin top={5} bottom={5}>
        <Row type="flex" justify="center">
          <Typography.Title>Company Hierarchy Management</Typography.Title>
        </Row>
        <Padding top={3} bottom={3}>
          <Row type="flex" justify="center"><Button type="primary" size="large" onClick={signIn}>Sign in</Button></Row>
        </Padding>
        <Row type="flex" justify="center"><Button onClick={signUp}>Sign up</Button></Row>
      </Margin>
    </React.Fragment>
  );
}

export default withRouter(homePage);

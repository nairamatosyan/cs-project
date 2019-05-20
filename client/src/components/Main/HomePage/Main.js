import React from 'react';

import { Margin } from 'styled-components-spacing';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Row,
  Col,
} from 'antd';
const homePage = (props) => {

  return (
    <React.Fragment>
      <Margin top={5} bottom={5}>
        Home Page
      </Margin>
    </React.Fragment>
  );
}

export default withRouter(homePage);

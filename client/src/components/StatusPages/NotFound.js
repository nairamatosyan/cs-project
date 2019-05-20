import React from 'react';
import { Margin, Padding } from 'styled-components-spacing';
import {
  Typography,
  Row,
} from 'antd';

function notFound(props) {

  return (
    <React.Fragment>
      <Margin top={5} bottom={5}>
        <Padding top={5}>
          <Row type="flex" justify="center">
            <Typography.Title level={1}>
              Oops, where did it go?
            </Typography.Title>
          </Row>
        </Padding>
        <Row type="flex" justify="center">
          <Typography.Title level={1}>
            404
          </Typography.Title>
        </Row>
        <Row type="flex" justify="center">
          <Typography.Text level={1}>
            We couldn't find the page you are requesting...
          </Typography.Text>
        </Row>
      </Margin>
    </React.Fragment>
  );
}

export default notFound;

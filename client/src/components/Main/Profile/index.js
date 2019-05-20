import React, { PureComponent } from 'react';
import { Padding, Margin } from 'styled-components-spacing';
import { Row, Col, Typography, Button, Avatar } from 'antd';
import { withRouter } from 'react-router-dom';

class Profile extends PureComponent {
  openOrganizations = () => {
      this.props.history.push('/organizations');
  }

  render() {
    return (<React.Fragment>
      <Margin top={5} bottom={5}>
          <Padding bottom={5}>
            <Row type="flex" justify="center">
              <Col span={10}>
                <Typography.Title level={2}>Profile & account </Typography.Title>
              </Col>
              <Col span={4}>
                <Button onClick={this.openOrganizations}>Organizations</Button>
              </Col>
            </Row>
          </Padding>
          <Row type="flex" justify="center">
            <Col span={4}>
              <Avatar icon="user" size={140} />
            </Col>
            <Col span={10}>
              <Padding bottom={4}>
                <Row>
                  <Typography.Text strong>Username: test-username</Typography.Text>
                </Row>
                <Row>
                  <Typography.Text strong>Email: test@email.com</Typography.Text>
                </Row>
              </Padding>
            </Col>
          </Row>
      </Margin>
    </React.Fragment>)
  }
}

export default withRouter(Profile);
import React, { PureComponent } from 'react';
import { Margin, Padding } from 'styled-components-spacing';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Row,
  Typography,
} from 'antd';
import { getAccessToken } from '../../../config/localStorage'

class HomePage extends PureComponent {
  constructor() {
    super();
    this.state = {
      isLoggedIn: !!getAccessToken()
    }
  }

  signIn = () => {
    this.props.history.push('/sign-in');
  }

  signUp = () => {
    this.props.history.push('/sign-up');
  }

  render() {
    return (
      <React.Fragment>
        <Margin top={5} bottom={5}>
          <Row type="flex" justify="center">
            <Typography.Title>Company Hierarchy Management</Typography.Title>
          </Row>
          {!this.state.isLoggedIn ? <div>
            <Padding top={3} bottom={3}>
              <Row type="flex" justify="center"><Button type="primary" size="large" onClick={this.signIn}>Sign in</Button></Row>
            </Padding>
            <Row type="flex" justify="center"><Button onClick={this.signUp}>Sign up</Button></Row>
          </div> : 
          <Row type="flex" justify="center">
            <Typography.Title level={3}>Welcome to our team!<br />Start visualizing the tree of your company right now!</Typography.Title>
          </Row>
          }
        </Margin>
      </React.Fragment>
    );
  }
}

export default withRouter(HomePage);

import React, { Component } from 'react';
import { Margin } from 'styled-components-spacing';
import { withRouter } from 'react-router-dom';
import { saveState , loadState} from '../../../config/localStorage';
import { API_ROOT } from '../../../config/env-vars' ;
import { AuthConsumer } from '../AuthContext';
import {
  Form, Icon, Input, Button, Col, Row, message
} from 'antd';
import axios from 'axios';

class SignInPage extends Component {

  render() {
    // TODO: remember me checkbox
    // TODO: forgot password

    const iconStyles = { color: 'rgba(0, 0, 0, .25)' };
    const { getFieldDecorator } = this.props.form;
    return (<Margin top={5}>
      <Row>
        <Col span={8} offset={8}>
          <h1>Sign In</h1>
          <AuthConsumer>
          {({ isAuth, login }) => (
            <Form onSubmit={(e) => this.handleSubmit(e, login)}>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Email cannot be blank!' }],
                })(
                  <Input prefix={<Icon type="user" style={iconStyles} />} type="email" placeholder="Email" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Password cannot be blank' }],
                })(
                  <Input prefix={<Icon type="lock" style={iconStyles} />} type="password" placeholder="Password" />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Log in
                </Button>
                &nbsp; or <a href="/sign-up">register now!</a>
              </Form.Item>
            </Form>)}
          </AuthConsumer>
        </Col>
      </Row>
    </Margin>
    );
  }

  handleSubmit = (e, login) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post(`${API_ROOT}/users/login`, values).then(async response => {
          await login();
          await saveState(response.data);
          
          if (loadState().email) {
             this.props.history.push('/profile');
          }
         
        })
        .catch(error => {
          message.error('Something went wrong! Please try again.');
        })
      }
    });
  }
}

const FormWrapper = Form.create()(SignInPage);
export default withRouter(FormWrapper);

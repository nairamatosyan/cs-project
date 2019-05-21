import React, { PureComponent } from 'react';
import {
  Form, Icon, Input, Button, Col, Row
} from 'antd';
import { Margin } from 'styled-components-spacing';
import axios from 'axios';

class RegistrationPage extends PureComponent {
  render() {
    // FIXME: change this inline style according to styleguide
    const iconStyles = { color: 'rgba(0, 0, 0, .25)' };
    const { getFieldDecorator } = this.props.form;
    return (<Margin top={5}>
      <Row>
        <Col span={8} offset={8}>
          <h1>Sign Up</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Email cannot be blank!' }],
              })(
                <Input prefix={<Icon type="user" style={iconStyles} />} type="email" placeholder="Email" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Password cannot be blank' },
                  { validator: this.validateToNextPassword }
                ],
              })(
                <Input prefix={<Icon type="lock" style={iconStyles} />} type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('confirm_password', {
              rules: [
                { required: true, message: 'Please confirm your password' },
                {'validator': this.compareToFirstPassword }
              ],
            })(
              <Input prefix={<Icon type="lock" style={iconStyles} />} type="password" placeholder="Confirm Password" />
            )}
          </Form.Item>
          <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Account
              </Button>
              &nbsp; or already have an account? <a href="/sign-in">Log in!</a>
          </Form.Item>

          </Form>
        </Col>
      </Row>
    </Margin>);
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords do not match');
      return;
    }
    callback();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('http://localhost:3030/users',{
          email: values.email, 
          password: values.password}).then(response => {
          
          alert('You have registered successfully. Now please login to your account.');
          window.location = '/sign-in';
        })
        .catch(error => {
          console.log(error);
        })
      }
    });
  }
}

const FormWrapper = Form.create()(RegistrationPage);
export default FormWrapper;

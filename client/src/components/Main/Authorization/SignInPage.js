import React, { Component } from 'react';
import { Margin } from 'styled-components-spacing';
import {
  Form, Icon, Input, Button, Col, Row
} from 'antd';


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
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'email cannot be blank!' }],
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
          </Form>
        </Col>
      </Row>
    </Margin>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // send request
      }
    });
  }
}

const FormWrapper = Form.create()(SignInPage);
export default FormWrapper;

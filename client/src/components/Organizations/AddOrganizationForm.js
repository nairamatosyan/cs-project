import React, { PureComponent } from 'react';
import {
  Select,
  Button,
  Icon,
  Form,
  Input,
  message,
} from 'antd';
import { getAccessToken } from '../../config/localStorage';
import { API_ROOT } from '../../config/env-vars';
import axios from 'axios';

const { Option } = Select;
let id = 0;

class AddOrganization extends PureComponent {
  state = {
    positions: [],
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const accessToken = getAccessToken();
        axios.post(`${API_ROOT}/organizations/add`, {
            data: values
        }, {
          headers: { Authorization: `Bearer ${accessToken}`}
        }).then(({ data }) => {
          if (data) {
            window.location.reload();
            return;
          }
          message.error('Something went wrong!');
        })
        .catch(error => {
          message.error('Something went wrong! Please try again.')
        });
      }
    });
  };

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);

    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue, getFieldsValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 20 },
      },
    };

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (<Form.Item {...formItemLayout} key={index}>
        <Form.Item
          label={index === 0 ? 'Positions' : ''}
          required={false}
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
          {getFieldDecorator(`positions[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input position or delete this field.",
              },
            ],
          })(<Input placeholder="Position name" style={{ width: '60%', marginRight: 8 }} />)}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          ) : null}
        </Form.Item>

        {!!index && <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
          {getFieldDecorator(`parents[${k}]`, {
            rules: [{ required: true, message: 'Please select parent position' }],
          })(
            <Select
              placeholder="Select parent"
            >
              {getFieldsValue().positions.map((item, key) => (
                (item && key !== k) && <Option key={key} value={key}>{item}</Option>
              ))}
            </Select>,
          )}
        </Form.Item>}
      </Form.Item>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Organization name cannot be blank!' }],
          })(
            <Input type="text" placeholder="Organization name" />
          )}
        </Form.Item>

        {formItems}
        <Form.Item {...formItemLayout}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add Positions
          </Button>
        </Form.Item>

        <Form.Item {...formItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(AddOrganization);

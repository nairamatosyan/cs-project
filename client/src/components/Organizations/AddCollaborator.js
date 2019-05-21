import React, { PureComponent } from 'react';
import { Form, DatePicker, Button, Input, Select, message } from 'antd';
import axios from 'axios';
import { getAccessToken } from '../../config/localStorage';
import { API_ROOT } from '../../config/env-vars';
const { RangePicker } = DatePicker;
const { Option } = Select;


class AddCollaborator extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const rangeValue = fieldsValue['range-picker'];
      const values = {
        ...fieldsValue,
        'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };
      const accessToken = getAccessToken();
      axios.post(`${API_ROOT}/organizations/addCollaborator`, values, {
          headers: { Authorization: `Bearer ${accessToken}`}
        }).then(({ data }) => {
          // if (data) {
          //   window.location.reload();
          //   return;
          // }
          // message.error('Something went wrong!');
        })
        .catch(error => {
          message.error('Something went wrong! Please try again.')
        })
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 8 },
      },
      wrapperCol: {
        sm: { span: 12 },
      },
    };

    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: 'Please select date range!' }],
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input the name',
              },
            ],
          })(<Input placeholder="Collaborator name" />)}
        </Form.Item>

        <Form.Item label="Position">
          {getFieldDecorator('position', {
            rules: [{ required: true, message: 'Please select the position!' }],
          })(
            <Select
              placeholder="Select position"
              onChange={this.handleSelectChange}
            >
              {this.props.positions.map((item, key) => (
                <Option key={key} value={item.id}>{item.name}</Option>
                ))}
            </Select>,
          )}
        </Form.Item>

        <Form.Item label="Pick the range">
          {getFieldDecorator('range-picker', rangeConfig)(<RangePicker />)}
        </Form.Item>

        <Form.Item label="Salary">
          {getFieldDecorator('salary')(<Input placeholder="Salary amount" />)}
        </Form.Item>

        <Form.Item
          wrapperCol={{
            sm: { span: 12, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedTimeRelatedForm = Form.create()(AddCollaborator);

export default WrappedTimeRelatedForm;
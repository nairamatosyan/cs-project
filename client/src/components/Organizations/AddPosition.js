import React, { PureComponent } from 'react';
import { Form, DatePicker, Button, Input, Select, Upload, Icon } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;

class AddPosition extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
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

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input position name',
              },
            ],
          })(<Input placeholder="Position name" />)}
        </Form.Item>

        <Form.Item label="Parent Position">
          {getFieldDecorator('parent', {
            rules: [{ required: true, message: 'Please select the parent!' }],
          })(
            <Select
              placeholder="Parent position"
              onChange={this.handleSelectChange}
            >
              {this.props.positions.map((item, key) => (
                <Option key={key} value={item.id}>{item.name}</Option>
                ))}
            </Select>,
          )}
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

const WrappedTimeRelatedForm = Form.create()(AddPosition);

export default WrappedTimeRelatedForm;
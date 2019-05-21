import React, { PureComponent } from 'react';
import { Form, DatePicker, Button, Input, Select, Upload, Icon } from 'antd';
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
        'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
        'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
        'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
        'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      };
      console.log('Received values of form: ', values);
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
        <Form.Item label="Collaborator photo" extra="Please upload an image">
          {getFieldDecorator('avatar', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="/upload-image" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>,
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

const WrappedTimeRelatedForm = Form.create()(AddCollaborator);

export default WrappedTimeRelatedForm;
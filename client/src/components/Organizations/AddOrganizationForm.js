import React, { PureComponent } from 'react';
import {
  Select,
  Button,
  Icon,
  Form,
  Input,
} from 'antd';
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
        console.log('Received values of form: ', values);
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

  selectParent = (value) => {
    console.log(value);
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
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
          {getFieldDecorator(`names[${k}]`, {
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
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please select parent position' }],
          })(
            <Select
              placeholder="Select parent"
              onChange={this.selectParent}
            >
              <Option key={1} value="male">male</Option>
              <Option key={2} value="female">female</Option>
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
import React, { PureComponent } from 'react';
import { Padding, Margin } from 'styled-components-spacing';
import { Row, Col, Typography, Button, Card } from 'antd';
import { withRouter } from 'react-router-dom';
import AddOrganizationForm from './AddOrganizationForm';

class Organizations extends PureComponent {
  state = {
    add: false,
    data: [{
      name: 'test1'
    },
    {
      name: 'test2'
    }]
  }

  addOrganization = () => {
      this.setState({add: true})
  }

  render() {
    return (<React.Fragment>
      <Margin top={5} bottom={5}>
        <Row type='flex' justify='center'>
          <Col span={14}>
            <Typography.Title level={2}>My Organizations</Typography.Title>
            {!this.state.add && <div>
              <Padding bottom={3}>
                <Button onClick={this.addOrganization}>Add Organization</Button>
              </Padding>

              {this.state.data.map((item, key) => (
                <Padding bottom={3} key={key}>
                  <Card>{item.name}</Card>
                </Padding>
              ))}
            </div>}
            {this.state.add &&
              <Row>
                <AddOrganizationForm />
              </Row>}
          </Col>
        </Row>
      </Margin>
    </React.Fragment>)
  }
}

export default withRouter(Organizations);
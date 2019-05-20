import React, { PureComponent } from 'react';
import { Padding, Margin } from 'styled-components-spacing';
import { Row, Col, Typography, Button, Card } from 'antd';
import { withRouter } from 'react-router-dom';
import AddOrganizationForm from './AddOrganizationForm';

class Organizations extends PureComponent {
  state = {
    add: false,
    data: [{
      id: 1,
      name: 'test1'
    },
    {
      id: 2,
      name: 'test2'
    }]
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
                <Card hoverable={true} onClick={() => this.openOrganization(item.id)}>{item.name}</Card>
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

  
  addOrganization = () => {
    this.setState({add: true})
  }

  openOrganization = (id) => {
    this.props.history.push(`/organization/${id}`);
  }
}

export default withRouter(Organizations);
import React, { PureComponent } from 'react';
import { Padding, Margin } from 'styled-components-spacing';
import { Row, Col, Typography, Button, Modal, Icon, message } from 'antd';
import { withRouter } from 'react-router-dom';
import AddCollaborator from './AddCollaborator';
import AddPosition from './AddPosition';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { getAccessToken } from '../../config/localStorage';
import { API_ROOT } from '../../config/env-vars';
require("highcharts/modules/sankey")(Highcharts);
require("highcharts/modules/organization")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);


class OrganizationPage extends PureComponent {
  constructor(props) {
    super(props);
  
    this.state = {
      id: null,
      data: {
        name: '',
        positions: [],
        mainData: []
      }
    }
  }
  
  async componentDidMount() {
    const accessToken = getAccessToken();
    axios.get(`${API_ROOT}${this.props.location.pathname}`, {
        headers: { Authorization: `Bearer ${accessToken}`}
      }).then(({ data }) => {
        this.setState({data: {name: data.organization[0].name, positions: data.positionData, mainData: data.data}});
      })
      .catch(error => {
        message.error('Something went wrong! Please try again.');
      })
  }

  render() {
    return (<React.Fragment>
      <Margin top={5} bottom={5}>
        <Row type='flex' justify='center'>
          <Col span={14}>
            <Padding bottom={2}>
              <a onClick={this.backToList}>
                <Icon type="left" />Back to List
              </a>
            </Padding>
            <Typography.Title level={2}>Organization: {this.state.data.name}</Typography.Title>
            <Padding top={3} bottom={5}>
              <Row>
                <Button onClick={this.addCollaborator} style={{ marginRight: 10 }}>Add Collaborator</Button>
                <Button onClick={this.addPosition}>Add Position</Button>
              </Row>
            </Padding>

            <HighchartsReact
              highcharts={Highcharts}
              options={this.getChartOptions()}
            />
          </Col>
        </Row>
      </Margin>
      {this.collaboratorModal()}
      {this.positionModal()}
    </React.Fragment>)
  }

  backToList = () => {
    this.props.history.push('/organizations');
  }

  
  getChartOptions = () => {
    return {
      chart: {
        height: this.state.data.positions.length * 120,
        inverted: true,
      },

      title: {
          text: 'Organization Position Tree'
      },

      series: [{
          type: 'organization',
          name: 'Positions',
          keys: ['from', 'to'],
          ...this.state.data.mainData,
          colorByPoint: false,
          color: '#007ad0',
          dataLabels: {
            color: 'white',
            nodeFormatter: function (node) {
                // Call the default renderer
                let html = Highcharts.defaultOptions
                    .plotOptions
                    .organization
                    .dataLabels
                    .nodeFormatter
                    .call(this);
                // Do some modification
                return html;
            }
        },
          borderColor: 'white',
          nodeWidth: 100
      }],
      tooltip: {
          outside: true
      },
      exporting: {
          allowHTML: true,
          sourceWidth: 800,
          sourceHeight: 600
      }
    };
  };

  collaboratorModal = () => (
    <Modal
      title="Add Collaborator"
      visible={this.state.addCollaborator}
      onCancel={this.handleCancelCollaborator}
      footer={null}
      width={700}
    >
      <AddCollaborator positions={this.state.data.positions} />
    </Modal>
  )

  positionModal = () => (
    <Modal
      title="Add Position"
      visible={this.state.addPosition}
      onCancel={this.handleCancelPosition}
      footer={null}
    >
      <AddPosition positions={this.state.data.positions} />
    </Modal>
  );

  
  addCollaborator = () => {
    this.setState({ addCollaborator: true });
  }

  addPosition = () => {
    this.setState({ addPosition: true });
  }

  handleCancelCollaborator = e => {
    this.setState({
      addCollaborator: false,
    });
  };

  handleCancelPosition = e => {
    this.setState({
      addPosition: false,
    });
  };
}

export default withRouter(OrganizationPage);
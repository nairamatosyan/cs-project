import React, { PureComponent } from 'react';
import { Padding, Margin } from 'styled-components-spacing';
import { Row, Col, Typography, Button, Modal, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import AddCollaborator from './AddCollaborator';
import AddPosition from './AddPosition';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require("highcharts/modules/sankey")(Highcharts);
require("highcharts/modules/organization")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);


class OrganizationPage extends PureComponent {
  constructor(props) {
    super(props);
  
    this.state = {
      id: null,
      data: {
        name: 'test1',
        positions: [{
          id: 1,
          name: 'testtt',
        }, {
          id: 2,
          name: 'testtt 2',
        }],
        mainData: []
      }
    }
  }
  
  async componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const id = query.get('id');
    this.setState({ id });

    if (id) {
      // get data here
    }
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
        height: 600,
        inverted: true,
      },

      title: {
          text: 'Organization Position Tree'
      },

      series: [{
          type: 'organization',
          name: 'Positions',
          keys: ['from', 'to'],
          data: [
              ['Shareholders', 'Board'],
              ['Board', 'CEO'],
              ['CEO', 'CTO'],
              ['CEO', 'CPO'],
              ['CEO', 'CSO'],
              ['CEO', 'CMO'],
              ['CEO', 'HR'],
              ['CTO', 'Product'],
              ['CTO', 'Web'],
              ['CSO', 'Sales'],
              ['CMO', 'Market']
          ],
          levels: [{
              level: 0,
              color: 'silver',
              dataLabels: {
                  color: 'black'
              },
              height: 25
          }, {
              level: 1,
              color: 'silver',
              dataLabels: {
                  color: 'black'
              },
              height: 25
          }, {
              level: 2,
              color: '#980104'
          }, {
              level: 4,
              color: '#359154'
          }],
          nodes: [{
              id: 'Shareholders'
          }, {
              id: 'Board'
          }, {
              id: 'CEO',
              title: 'CEO',
              name: 'Grethe Hjetland',
              image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132317/Grethe.jpg'
          }, {
              id: 'HR',
              title: 'HR/CFO',
              name: 'Anne Jorunn Fjærestad',
              color: '#007ad0',
              image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132314/AnneJorunn.jpg',
          }, {
              id: 'CTO',
              title: 'CTO',
              name: 'Christer Vasseng',
              image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12140620/Christer.jpg',
              layout: 'hanging'
          }, {
              id: 'CPO',
              title: 'CPO',
              name: 'Torstein Hønsi',
              image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12131849/Torstein1.jpg'
          }, {
              id: 'CSO',
              title: 'CSO',
              name: 'Anita Nesse',
              image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132313/Anita.jpg',
              layout: 'hanging'
          }, {
              id: 'CMO',
              title: 'CMO',
              name: 'Vidar Brekke',
              image: 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/13105551/Vidar.jpg',
              layout: 'hanging'
          }, {
              id: 'Product',
              name: 'Product developers'
          }, {
              id: 'Web',
              name: 'General tech',
              description: 'Web developers, sys admin'
          }, {
              id: 'Sales',
              name: 'Sales team'
          }, {
              id: 'Market',
              name: 'Marketing team'
          }],
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
          nodeWidth: 65
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
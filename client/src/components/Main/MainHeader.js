import React from 'react';
import { Row, Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import SettingsDropDown from './SettingsDropDown';
const { Header } = Layout;

const mainHeader = (props) => {
  // const redirectToHomepage = () => {
  //   props.history.push('/');
  // }

  return (<Header theme={'light'}>
    <Row type="flex" justify="space-between">
      <div></div>
      <SettingsDropDown />
    </Row>
  </Header>);
}

export default withRouter(mainHeader);

import React from 'react';
import { Row, Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import SettingsDropDown from './SettingsDropDown';
import { AuthConsumer } from './AuthContext';
const { Header } = Layout;

const mainHeader = (props) => {
  // const redirectToHomepage = () => {
  //   props.history.push('/');
  // }

  return (<Header theme={'light'}>
    <Row type="flex" justify="space-between">
      <div></div>
      <AuthConsumer>
        {({ isAuth, login, logout }) => (isAuth && <SettingsDropDown />)}
      </AuthConsumer>
    </Row>
  </Header>);
}

export default withRouter(mainHeader);

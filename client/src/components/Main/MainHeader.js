import React from 'react';
import { Row, Layout } from 'antd';
import { withRouter } from 'react-router-dom';
const { Header } = Layout;

const mainHeader = (props) => {
  // const redirectToHomepage = () => {
  //   props.history.push('/');
  // }

  return (<Header theme={'light'}>
  </Header>);
}

export default withRouter(mainHeader);

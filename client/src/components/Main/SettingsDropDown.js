import React from 'react';
import LogOut from './Authorization/LogOut';
import { Menu, Dropdown, Icon, Avatar } from 'antd';
import { withRouter } from 'react-router-dom'

function settingsDropDown(props) {
  const redirectToProfile = () => {
    props.history.push('/profile');
  }

  const redirectToOrganizations = () => {
    props.history.push('/organizations');
  }

  const menu = (
    <Menu style={{ width: '150px' }}>
      <Menu.Item onClick={redirectToProfile}>
        <Icon type="user" />Profile
      </Menu.Item>
      <Menu.Item onClick={redirectToOrganizations}>
        <Icon type="hdd" />Organizations
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <LogOut />
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <span>
        <Avatar icon="user" />
      </span>
    </Dropdown>
  );
}

export default withRouter(settingsDropDown);

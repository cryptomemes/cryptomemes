import React, { Component } from 'react'
import { Layout, Menu, } from 'antd';
import UploadModal from './Modal';
import '../css/antd.css';

const { Header } = Layout

class NavBar extends Component {
  render() {
    const { logout } = this.props
    return (
      <Header className="header">
        <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ 
              lineHeight: '64px',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Menu.Item key="1">All</Menu.Item>
            <Menu.Item key="2">Profile</Menu.Item>
            <Menu.Item key="3">
              <UploadModal />
            </Menu.Item>
            <Menu.Item key="4" onClick={logout}>Logout</Menu.Item>
          </Menu>
      </Header>
    )
  }
}

export default NavBar

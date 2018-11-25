import React, { Component } from 'react'
import { Layout, Menu, } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UploadModal from './Modal';
import '../css/antd.css';

const HeaderText = styled.h1`
  font-familiy: "Permanent Marker";
  color: white;
  font-size: 3em;
  margin-left: 5em;
`;

const { Header } = Layout

class NavBar extends Component {
  render() {
    const { logout } = this.props
    return (
      <Header className="header">
        <Link to="/">
          <a className="logo" style={{ backgroundColor: '#001529' }} >
            {/* <div className="text"> */}
              <HeaderText> CryptoMemes </HeaderText>
            {/* </div> */}
          </a>
        </Link>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ 
              lineHeight: '64px',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Menu.Item style={{ color: 'white' }} key="1">All</Menu.Item>
            <Link style={{ color: 'white' }} to="/profile"> <Menu.Item key="2">Profile</Menu.Item> </Link>
            <Menu.Item style={{ color: 'white' }} key="3">
              <UploadModal />
            </Menu.Item>
            <Menu.Item style={{ color: 'white' }} key="4" onClick={logout}>Logout</Menu.Item>
          </Menu>
      </Header>
    )
  }
}

export default NavBar

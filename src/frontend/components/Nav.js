import React from 'react'
import { Layout, Menu } from 'antd'

const { Header } = Layout

const Nav = ({ logout }) => (
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Stocks</Menu.Item>
        <Menu.Item key="3" onClick={logout}>Logout</Menu.Item>
      </Menu>
    </Header>
)

export default Nav
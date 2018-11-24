import React, { Component, Fragment } from 'react'
import { Layout } from 'antd'

class MainContent extends Component {
  render() {
  const { Content } = Layout

    return(
      <Content style={{ padding: '0px', margin: '0px' }}>
        <Layout style={{ padding: '0px', margin: '0px', background: '#fff' }}>
            Content
        </Layout>
      </Content>
    )
  }
}

export default MainContent

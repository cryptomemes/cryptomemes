import React, { Component, Fragment } from 'react'
import { Layout } from 'antd'

class Footer extends Component {
  render() {
  const { Footer } = Layout

    return(
      <Footer style={{ textAlign: 'center' }}>
        CryptoMemes ©2018 Created by CryptoChamps
      </Footer>
    )
  }
}

export default Footer

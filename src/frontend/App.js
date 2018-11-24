import React, { Component } from 'react'
import NavBar from './components/layout/NavBar'
import MainContent from './components/layout/MainContent'
import Footer from './components/layout/Footer'
import { Layout } from 'antd'

class App extends Component {
    render() {
        return (
          <Layout>
            <NavBar />
            <MainContent />
            <Footer />
          </Layout>
        )
    }
}

export default App

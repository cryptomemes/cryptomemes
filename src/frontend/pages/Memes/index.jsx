import React, { Fragment, Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Card, Row, Col, Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';
import NavBar from './NavBar';

const { Meta } = Card;
const { Footer } = Layout

const sampleMemes = [
  {
    imageSrc: 'https://imgix.ranker.com/user_node_img/50056/1001100544/original/v-photo-u1?w=650&q=50&fm=jpg&fit=crop&crop=faces',
    title: 'Douche Store',
    owner: 'Carter Williams',
  },
  {
    imageSrc: 'https://pics.me.me/is-your-body-from-mcdonalds-because-imlovingit-5262227.png',
    title: 'Mr Bean',
    owner: 'Mcadoo',
  },
  {
    imageSrc: 'https://www.yourtango.com/sites/default/files/styles/header_slider/public/display_list/list.jpg?itok=PceCEIvN',
    title: 'Chang From Hangover',
    owner: 'Jackie Chan',
  },
]

const MemeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const CardActionsContainer = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: end;
  align-items: end;
  flex-direction: row;
`

const PageFooter = () => (
  <Footer style={{ textAlign: 'center' }}>
    CryptoMemes ©2018 Created by CryptoChamps
  </Footer>
)

const MemeCard = ({ imageSrc, title, owner, liked }) => (
  <Row style={{ padding: '2em' }}>
    <Col span={18}>
      <Card
        hoverable
        style={{ width: '30em' }}
        cover={<img src={imageSrc} />}
      >
        <Meta
          title={title}
          description={owner}
        />
        <CardActionsContainer>
          <Icon type="like" style={{ fontSize: '2em', color: (liked ? 'blue' : 'gray') }} />
          &nbsp; &nbsp;
          <Icon type="dollar" style={{ fontSize: '2em' }} />
        </CardActionsContainer>
      </Card>
    </Col>
  </Row>
)

class MemesPage extends Component {
  componentDidMount() {
  }

  render() {
    const { authStore: { logout } } = this.props
    return (
      <Fragment>
        <NavBar logout={logout} />
        <MemeContainer>
          {
            sampleMemes.map(meme => 
              <MemeCard
                imageSrc={meme.imageSrc}
                title={meme.title}
                owner={meme.owner}
                key={meme.title}
              />) 
          }
        </MemeContainer>
        <PageFooter />
      </Fragment>
    )
  }
}

export default inject('memeStore', 'authStore')(observer(MemesPage))

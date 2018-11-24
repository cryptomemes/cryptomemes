import React, { Fragment, Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Card, Row, Col, Layout, Menu, Icon } from 'antd';
import styled from 'styled-components'; import '../../css/antd.css'
import BuySharesModal from '../../components/BuySharesModal'
import NavBar from '../../components/NavBar';

const { Meta } = Card;
const { Footer } = Layout

const sampleMemes = [
  {
    imageSrc: 'https://imgix.ranker.com/user_node_img/50056/1001100544/original/v-photo-u1?w=650&q=50&fm=jpg&fit=crop&crop=faces',
    title: 'Douche Store',
    owner: 'Carter Williams',
    saleLimit: '$50',
  },
  {
    imageSrc: 'https://pics.me.me/is-your-body-from-mcdonalds-because-imlovingit-5262227.png',
    title: 'Mr Bean',
    owner: 'Mcadoo',
    saleLimit: '$12',
  },
  {
    imageSrc: 'https://www.yourtango.com/sites/default/files/styles/header_slider/public/display_list/list.jpg?itok=PceCEIvN',
    title: 'Chang From Hangover',
    owner: 'Jackie Chan',
    saleLimit: '$90',
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
  align-items: center;
  flex-direction: row;
`

const PageFooter = () => (
  <Footer style={{ textAlign: 'center' }}>
    CryptoMemes ©2018 Created by CryptoChamps
  </Footer>
)

const MemeCard = ({ imageSrc, title, owner, liked, saleLimit, onLikeClick }) => (
  <Row style={{ padding: '2em' }}>
    <Col span={18}>
      <Card
        hoverable
        style={{ width: '30em' }}
        cover={<img src={imageSrc} />}
        actions={[
          <a onClick={onLikeClick}>
            <Icon type="like" style={{ color: (liked ? 'blue' : 'gray') }}  />
          </a>,
          <BuySharesModal />,
          <div>{`Buy limit: ${saleLimit}`}</div>
        ]}
      >
        <Meta
          title={title}
          description={`For sale: ${owner}`}
        />
      </Card>
    </Col>
  </Row>
)

class MemesPage extends Component {
  async componentDidMount() {
    const { memeStore: { fetchMemes }} = this.props
    await fetchMemes()
  }

  handleLikeClick = () => {
    console.log('Clicked like')
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
                saleLimit={meme.saleLimit}
                onLikeClick={this.handleLikeClick}
              />) 
          }
        </MemeContainer>
        <PageFooter />
      </Fragment>
    )
  }
}

export default inject('memeStore', 'authStore', 'memeStore')(observer(MemesPage))

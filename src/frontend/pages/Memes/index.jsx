import React, { Fragment, Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Card, Row, Col, Layout, Menu, Icon } from 'antd';
import styled from 'styled-components'; import '../../css/antd.css'
import BuySharesModal from '../../components/BuySharesModal'
import NavBar from '../../components/NavBar';
import Loader from '../../components/Loader';

const { Meta } = Card;
const { Footer } = Layout

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

const MemeCard = ({ imageSrc, title, owner, liked, saleLimit, onLikeClick, index }) => (
  <Row style={{ padding: '2em' }}>
    <Col span={18}>
      <Card
        hoverable
        style={{ width: '30em' }}
        cover={<img src={imageSrc} />}
        actions={[
          <a onClick={() => onLikeClick(index)}>
            <Icon type="like" style={{ color: (liked ? 'blue' : 'gray') }}  />
          </a>,
          <BuySharesModal />,
          <div>{`Buy limit: ${saleLimit}`}</div>
        ]}
      >
        <Meta
          title={title}
          description={`For sale: ${price}`}
        />
      </Card>
    </Col>
  </Row>
)

class MemesPage extends Component {
  constructor (props) {
    super(props)
    this.handleLikeClick = this.handleLikeClick.bind(this)
  }
  async componentDidMount() {
    const { memeStore: { fetchMemes }} = this.props
    await fetchMemes()
  }

  async handleLikeClick (memeIndex) {
    console.log('click', memeIndex)
    const { memeStore: { upvoteMeme } } = this.props    
    await upvoteMeme(memeIndex)
  }

  render() {
    const { authStore: { logout }, memeStore: { memes, isMemeFetching } } = this.props
    return (
      <Fragment>
        <NavBar logout={logout} />
        <MemeContainer>
          {
            isMemeFetching ? <Loader /> :
            memes.map(meme => 
              <MemeCard
                imageSrc={`https://s3-ap-southeast-1.amazonaws.com/crypto-memes/${meme.photoImage}`}
                title={meme.title}
                key={meme.title}
                price={meme.price}
                saleLimit={meme.sellables.reduce((acc, val) => { return acc + val}, 0)}
                index={meme.index}
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

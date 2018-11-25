import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Row, Col, Card, Icon, Avatar } from 'antd';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';

const { Meta } = Card;

const Hero = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const H2 = styled.h2`
  color: #333;
  font-weight: 800;
  font-size: 2.5em;
`;

const H3 = styled.h3`
  font-weight: 500;
  font-size: 2em;
  margin-top: 1em;
`

const MemeContainer = styled.div`
  display: flex;
  // justify-content: center;
  // align-items: center;
  flex-direction: row;
`;

const MemeCard = ({ imageSrc, title, price, liked, saleLimit, onLikeClick }) => (
  <Row style={{ padding: '2em' }}>
    <Col span={18}>
      <Card
        hoverable
        style={{ width: '30em' }}
        cover={<img src={imageSrc} />}
        actions={[
          <a onClick={() => onLikeClick(index)}> <Icon type="like" style={{ color: (liked ? 'blue' : 'gray') }}  /> </a>,
          <div />,
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
);

class ProfilePage extends Component {
  async componentDidMount() {
    const { memeStore: { fetchMemes, getUserMemes } } = this.props;
    await fetchMemes()
    await getUserMemes()
  }

  render() {
    const { memeStore : { usersMemes } } = this.props;
    console.log(usersMemes)
    return (
      <Fragment>
        <NavBar />
        <MemeContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <Hero>
            <Avatar size={128} style={{ margin: '16px' }} src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=378ca7e2f7edc396bcdd72991cba78c5&auto=format&fit=crop&w=1950&q=80" />
            <H2> Antonov </H2>
          </Hero>
          <div className='owned-memes'>
            <H3> OWNED MEMES </H3>
            {usersMemes.map(meme => <MemeCard
              imageSrc={`https://s3-ap-southeast-1.amazonaws.com/crypto-memes/${meme.photoImage}`}
              title={meme.title}
              key={meme.title}
              price={meme.price}
              saleLimit={meme.sellables.reduce((acc, val) => { return acc + val}, 0)}
            />)}
          </div>
        </MemeContainer>
        <Footer />
      </Fragment>
    )
  }
}

export default inject('userStore', 'memeStore')(observer(ProfilePage));

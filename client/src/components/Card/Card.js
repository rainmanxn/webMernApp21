import React from 'react';
import styled from 'styled-components';
import unlike from './unliked.svg';
import avatar from './avatar.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteArticle, getArticles, setLike } from '../../actions/articleActions';
import './Card.scss'
// import { createBrowserHistory } from 'history';
// let history = createBrowserHistory();
// import history from 'history/browser';
// let history = createBrowserHistory({
//   window: iframe.contentWindow
// });

const Like = styled.img.attrs((props) => ({ src: props.img }))`
  height: 14px;
  margin-left: 13px;
  &:hover {
    cursor: pointer;
  }
`;

const Avatar = styled.img.attrs((props) => ({ src: props.img }))`
  height: 46px;
  width: 46px;
  margin-left: 13px;
  &:hover {
    cursor: pointer;
  }
`;

const CountLikes = styled.div`
  width: 13px;
  height: 22px;
  margin-left: 4px;
  font-family: Inter,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.75);
`

const Wrapper = styled.div`
  position: relative;
  //margin-left: 150px;
  margin-top: 10px;
  width: 941px;
  height: 140px;
  //border: 1px solid black;
  background: #FFFFFF;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`

const LeftHalf = styled.div`
  margin-top: 15px;
  margin-left: 19px;
  width: 682px;
  height: 101px;
  //border: 1px solid black;
  display: flex;
  flex-direction: column;
`
const RightHalf = styled.div`
  margin-top: 15px;
  margin-right: 14px;
  width: 300px;
  height: 50px;
  //border: 1px solid black;
  display: flex;
  justify-content: flex-end;
`
// const BodyCard = styled.div`
//   background: #E5E5E5;
//   width: 100%;
//   height: 100vh;
//   position: relative;
//   display: flex;
//   justify-content: center;
// `

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Title = styled.div`
  height: 28px;
  font-family: Inter,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: #1890FF;
`

const TagBlock = styled.div`
  display: flex;
  height: 40px;
  //border: 1px solid black;
`

const Tag = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.5);
  height: 20px;
  padding: 2px;
  margin-top: 4px;
  margin-right: 5px;
  box-sizing: border-box;
  border-radius: 2px;
  font-family: Inter,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: rgba(0, 0, 0, 0.5);
`

const TextArticle = styled.div`
  width: 682px;
  height: 45px;
  font-family: Inter,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.75);
`
const Info = styled.div`
  //width: 150px;
  height: 46px;
  //border: 1px solid black;
`

const Name = styled.div`
  font-family: Inter,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.85);
`

const DataPost = styled.div`
  font-family: Inter,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
`

class Card extends React.Component {
  // const {title, description, text, tags, date} = props;
  onLike = () => {
    console.log('Clock')
  }
  render() {
    const { title, description, tags, date, userName, id, likes } = this.props;
    let listTags = Object.values({ ...tags });
    const renderTags = () => {
      return listTags.map(({ value, id }) => {
        return (
          <Tag key={`${id} + ${value}`}>{value}</Tag>
        )
      })
    }

    const linkCard = () => {
      // console.log(id)
      // history.push("/create")
      return (
        <Link to='/create' />
      )
    }
    // console.log(title, description, text, tags, date);
    return (
      // <BodyCard>
      <Wrapper onClick={linkCard}>
        <LeftHalf>
          <Header>
            <Title>{title}</Title>
            <Like onClick={this.onLike} img={unlike}/>
            <CountLikes>{likes}</CountLikes>
          </Header>
          <TagBlock>
            {renderTags()}
          </TagBlock>
          <Link to={`/articles/${id}`}>
          <TextArticle>
            {description}
          </TextArticle>
          </Link>
        </LeftHalf>
        <RightHalf>
          <Info>
            <Name>
              {userName}
            </Name>
            <DataPost>
              {date}
            </DataPost>
          </Info>
          <Avatar img={avatar}/>
        </RightHalf>
      </Wrapper>

    )
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
  loadingArticle: state.loadingArticle,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getArticles, deleteArticle, setLike }
)(Card);

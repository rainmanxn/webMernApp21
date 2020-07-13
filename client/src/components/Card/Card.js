import React from 'react';
import styled from 'styled-components';
import unlike from './unliked.svg';
import liked from './liked.svg';
import avatar from './avatar.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteArticle, getArticles, setLike } from '../../actions/articleActions';
import './Card.scss'
import { isAuthSelector, getIdSelector } from '../../redux/auth-selector';
import { getCurrentArticleLikesCount, getLikedUsersSelector } from '../../redux/articles-selectors';


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
  border-radius: 24px;
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
  word-break:break-all
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
  onLike = (id, likes, userId) => () => {
    const { isAuth } =this.props;
    if (isAuth) {
      const { setLike } = this.props;
      setLike(id, likes, userId);
    }
  }

  getIsLikedArticle = () => {
    const { likedUsers, currentArticleLikes, userId, id } = this.props;
    return (likedUsers.length === 0) ? false : (currentArticleLikes(id).indexOf(userId) === -1)
  }

  renderTags = () => {
    const { tags } = this.props;
    let listTags = Object.values({ ...tags });
    return listTags.map(({ value, id }) => {
      return (
        <Tag key={`${id} + ${value}`}>{value}</Tag>
      )
    })
  }

  linkCard = () => <Link to='/create' />;

  render() {
    const { title, description, date, userName, id, likes, url, userId } = this.props;
    const isLiked = this.getIsLikedArticle();
    const picture = url ? url : avatar;

    return (
      <Wrapper onClick={this.linkCard}>
        <LeftHalf>
          <Header>
            <Title>{title}</Title>
            {isLiked ?
              (<Like onClick={this.onLike(id, likes, userId)} img={unlike}/>)
              :
              (<Like onClick={this.onLike(id, likes, userId)} img={liked}/>)}
            <CountLikes>{likes}</CountLikes>
          </Header>
          <TagBlock>
            {this.renderTags()}
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
          <Avatar img={picture}/>
        </RightHalf>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: isAuthSelector(state),
  likedUsers: getLikedUsersSelector(state),
  userId: getIdSelector(state),
  currentArticleLikes: getCurrentArticleLikesCount(state),
})

export default connect(
  mapStateToProps,
  { getArticles, deleteArticle, setLike }
)(Card);

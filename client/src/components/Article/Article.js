import React from 'react';
import styled from 'styled-components';
import unlike from '../Card/unliked.svg'
import avatar from '../Card/avatar.png';
import { connect } from 'react-redux';
import { getArticles, deleteArticle, setLike } from '../../actions/articleActions';
import { Button, Popconfirm } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import liked from '../Card/liked.svg';
import { getArticlesListSelector, currentArticleSelector, getCountLikesSelector,
  getCurrentArticleLikesCount, getLikedUsersSelector } from '../../redux/articles-selectors';
import { getIdSelector, getNameSelector, isAuthSelector } from '../../redux/auth-selector'

const Body = styled.div`
padding-top: 1px;
  background: #E5E5E5;
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

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
  border-radius: 23px;
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
  margin-top: 24px;
  width: 941px;
  //height: 140px;
  //border: 1px solid black;
  background: #FFFFFF;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`
const InsideWrapper = styled.div`
  justify-content: flex-end;
  display: flex;
`
const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
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
  margin-top: 60px;
  margin-right: 14px;
  width: 300px;
  height: 50px;
  //border: 1px solid black;
  display: flex;
  flex-direction: column;
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
  word-break:break-all
`
const MainText = styled.div`
  margin-top: 25px;
  width: 880px;
  margin-left: 19px;
  font-family: Inter,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.75);
  word-break:break-all
`
const Info = styled.div`
  height: 46px;
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

class Article extends React.Component {
  componentDidMount() {
    const { isAuth, getArticles } = this.props;
    getArticles();
    if (!isAuth) {
      this.props.history.push("/login");
    }
  }

  getUTCDate = (dateString = Date.now()) => {
    const date = new Date(dateString);

    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );
  };

  getDate = (date) => {
    return format(this.getUTCDate(date), 'MMMM dd, yyyy')
  }

  onDelete = (id) => () => {
    const { deleteArticle, history } = this.props;
    deleteArticle(id);
    this.props.history.push('/');
  }

  onLike = (id, likes, userId) => () => {
    const { setLike } = this.props;
    setLike(id, likes, userId);
  }


  renderTags = (listTags) => {
    return listTags.map(({ value, id }) => {
      return (
        <Tag key={`${id} + ${value}`}>{value}</Tag>
      )
    })
  }

  render() {
  const { item, selectCurrentArticle, likesList, userId, name, currentArticleLikes, likedUsers } = this.props;
  const currentArticle = selectCurrentArticle(item);
  console.log('currentArticle!!', currentArticle)

  if (!currentArticle) {
    return null
  }

  const {title, description, tags, date, userName, text, _id, url } = currentArticle;
  const likes = likesList(_id);
  let listTags = Object.values({...tags});
  const formattedDate = this.getDate(date)
  const ava = url ? url : avatar;

  let isLiked;
  if (likedUsers.length === 0) {
    isLiked = false;
  } else {
    isLiked = (currentArticleLikes(_id).indexOf(userId) === -1);
  }
  const textPop = 'Are you sure to delete this article?';
  const stateEditButton = !(name === userName);

  return (
    <Body>
    <Wrapper>
      <InsideWrapper>
      <LeftHalf>
        <Header>
          <Title>{title}</Title>
          {isLiked ?
            (<Like onClick={this.onLike(_id, likes, userId)} img={unlike}/>)
            :
            (<Like onClick={this.onLike(_id, likes, userId)} img={liked}/>)}
          <CountLikes>{likes}</CountLikes>
        </Header>
        <TagBlock>
          {this.renderTags(listTags)}
        </TagBlock>
        <TextArticle>
          {description}
        </TextArticle>
      </LeftHalf>
      <RightHalf>
        <InsideWrapper>
          <Info>
            <Name>
              {userName}
            </Name>
            <DataPost>
              {formattedDate}
            </DataPost>
          </Info>
          <Avatar img={ava} />
        </InsideWrapper>
        <ButtonWrapper>
          <Popconfirm placement="rightTop" title={textPop} onConfirm={this.onDelete(_id)} okText="Yes" cancelText="No">
            <Button primary='true' disabled={stateEditButton} className='button_del'>Delete</Button>
          </Popconfirm>
          <Link to={`/edit/${item}`}>
            <Button primary='true' disabled={stateEditButton} className='button_edit'>Edit</Button>
          </Link>
        </ButtonWrapper>
      </RightHalf>
      </InsideWrapper>
      <MainText>
        {text}
      </MainText>
    </Wrapper>
    </Body>
  )
}
}

const mapStateToProps = state => ({
  articlesList: getArticlesListSelector(state),
  selectCurrentArticle: currentArticleSelector(state),
  likesList: getCountLikesSelector(state),
  userId: getIdSelector(state),
  name: getNameSelector(state),
  likedUsers: getLikedUsersSelector(state),
  currentArticleLikes: getCurrentArticleLikesCount(state),
  isAuth: isAuthSelector(state),
})

export default connect(
  mapStateToProps,
  { getArticles, deleteArticle, setLike }
)(Article);

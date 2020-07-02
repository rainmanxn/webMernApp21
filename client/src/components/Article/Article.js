import React from 'react';
import styled from 'styled-components';
import unlike from '../Card/unliked.svg'
import avatar from '../Card/avatar.png';
import { connect } from 'react-redux';
import { getArticles } from '../../actions/articleActions';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

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
  justify-content: space-between;
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

const Article = (props) => {
  const { articles, item } = props;
  const articlesList = articles.articles;
  const arr = Object.values(articlesList);
  const currentArticle = arr.filter(({ _id }) => _id === item)[0];

  if (!currentArticle) {
    return (
      <Body>
        Упс, что-то пошло не так
      </Body>
    )
  }
  const {title, description, tags, date, userName, text } = currentArticle;
  let listTags = Object.values({...tags});
  const renderTags = () => { return listTags.map(({ value, id }) => {
    return (
      <Tag key={id}>{value}</Tag>
    )
  })
  }

  // console.log(title, description, text, tags, date);
  return (
    <Body>
    <Wrapper>
      <InsideWrapper>
      <LeftHalf>
        <Header>
          <Title>{title}</Title>
          <Like img={unlike} />
          <CountLikes>13</CountLikes>
        </Header>
        <TagBlock>
          {renderTags()}
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
              {date}
            </DataPost>
          </Info>
          <Avatar img={avatar} />
        </InsideWrapper>
        <ButtonWrapper>
          <Link to='/create'>
            <Button className='button_del'>Delete</Button>
          </Link>
          <Link to='/create'>
            <Button className='button_edit'>Edit</Button>
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

const mapStateToProps = state => ({
  articles: state.articles,
  loadingArticle: state.loadingArticle
})

export default connect(
  mapStateToProps,
  { getArticles }
)(Article);

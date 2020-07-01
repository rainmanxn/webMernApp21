import React from 'react';
import styled from 'styled-components';
import unlike from './unliked.svg';
import avatar from './avatar.png';

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
  width: 150px;
  height: 50px;
  //border: 1px solid black;
  display: flex;
`
const BodyCard = styled.div`
  background: #E5E5E5;
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
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
  margin: 4px 0;
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
  width: 85px;
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

const Card = (props) => {
  const {title, description, text, tags, date} = props;
  // console.log("!!!!!TAGS", tags)
  // console.log(title, description, text, tags, date);
  return (
    // <BodyCard>
      <Wrapper>
        <LeftHalf>
          <Header>
            <Title>{title}</Title>
            <Like img={unlike} />
            <CountLikes>13</CountLikes>
          </Header>
          <TagBlock>
            <Tag>Tag1</Tag>
          </TagBlock>
          <TextArticle>
            {description}
          </TextArticle>
        </LeftHalf>
        <RightHalf>
          <Info>
            <Name>
              John Doe
            </Name>
            <DataPost>
              {date}
            </DataPost>
          </Info>
          <Avatar img={avatar} />
        </RightHalf>
      </Wrapper>
    // </BodyCard>
  )
}

export default Card;
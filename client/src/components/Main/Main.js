import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getArticles } from '../../actions/articleActions';
import Card from '../Card/Card';
import { format } from 'date-fns'

const Body = styled.div`
padding-top: 50px;
  background: #E5E5E5;
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

class Main extends React.Component {
  componentDidMount() {
    const { getArticles } = this.props;
    try {
      getArticles();
    } catch (e) {
      getArticles();
    }
  }

  getUTCDate(dateString = Date.now()) {
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

  getDate(date) {
    return format(this.getUTCDate(date), 'MMMM dd, yyyy')
  }

  render() {
    const { articles: {articles} }  = this.props;
    const { likes: likesArr } = this.props.articles;
    const arr = Object.values(articles);

    const renderCard = () => arr.map((el) => {
      const obj = Object.assign({}, el);
      const { title, description, text, tags, date, userName, _id, likedUsers } = obj;
      const currentLike = likesArr.filter(({ id, likes }) => id === _id)[0].likes;
      const dateNew = Date.now();
      const formattedDate = this.getDate(date)
      return (
          <Card
            id={_id}
            key={`${_id} + ${title} + ${dateNew}`}
            title={title}
            description={description}
            text={text}
            tags={tags}
            date={formattedDate}
            userName={userName}
            likes={currentLike}
            history={this.props.history}
            likedUsers={likedUsers}
          />
      )

    });
    return (
      <Body>
        {renderCard()}
      </Body>)
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
})

export default connect(
  mapStateToProps,
  { getArticles }
)(Main);
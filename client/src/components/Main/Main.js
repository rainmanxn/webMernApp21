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
    getArticles();
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
    const arr = Object.values(articles);
    // console.log('arr!!!', arr[0]);
    // console.log(obj.date);
    // const card = arr[0];
    // console.log(this.getDate(obj.date))
    // const { title, description, text, tags, date } = card;
    // const newDate = format(this.getUTCDate(date), 'MMMM dd, yyyy') // returns UTC time

    // const render = () => arr.map((el) => console.log(el));
    // рендерю карточки
    const renderCard = () => arr.map((el) => {
      const obj = Object.assign({}, el);
      const { title, description, text, tags, date, userName, _id } = obj;
      // console.log(title, description, text, tags, date);
      // console.log(_id);
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
          />
      )

    });
    // renderCard();
    return (
      <Body>
        {renderCard()}
      </Body>)
      // <Body>
      //   <Card
      //     // title={title}
      //     // description={description}
      //     // text={text}
      //     // tags={tags}
      //     // date={newDate}
      //   />
      // </Body>
      // )
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
  loadingArticle: state.loadingArticle
})

export default connect(
  mapStateToProps,
  { getArticles }
)(Main);
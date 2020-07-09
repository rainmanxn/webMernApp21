import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getArticles } from '../../actions/articleActions';
import ReactPaginate from 'react-paginate';
import Card from '../Card/Card';
import { format } from 'date-fns';
import './main.scss';

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
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0
    };
    this.handlePageClick = this
      .handlePageClick
      .bind(this);
  }

  componentDidMount() {
    this.getData();
    // this.renderCard();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.renderCard()
    }
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.renderCard()
    });

  };

  getData = () => {
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

  renderCard = () => {
    const { articles: {articles} }  = this.props;
    const { likes: likesArr } = this.props.articles;
    const { user } = this.props.auth;
    const arr = Object.values(articles);
    ////////////////////////////
    const slice = arr.slice(this.state.offset, this.state.offset + this.state.perPage)
    const postData = slice.map((el) => {
      const obj = Object.assign({}, el);
      const { title, description, text, tags, date, userName, _id, likedUsers, url } = obj;
      const currentLike = likesArr.filter(({ id, likes }) => id === _id)[0].likes;
      const dateNew = Date.now();
      const formattedDate = this.getDate(date)
      return (
        <Card
          id={_id}
          key={`${_id} + ${title} + ${Date.now()}`}
          title={title}
          description={description}
          text={text}
          tags={tags}
          date={formattedDate}
          userName={userName}
          likes={currentLike}
          history={this.props.history}
          likedUsers={likedUsers}
          url={url}
        />
      )
    })

    this.setState({
      pageCount: Math.ceil(arr.length / this.state.perPage),

      postData
    })
  };

  render() {
    const { articles: {articles} }  = this.props;
    const { likes: likesArr } = this.props.articles;
    const { user } = this.props.auth;
    const arr = Object.values(articles);
    console.log(this.state.postData)

    // return (
    //   <Body>
    //     {this.renderCard()}
    //   </Body>)

    return (
      <Body>
        {this.state.postData}
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}/>
      </Body>

    )

  }
}

const mapStateToProps = state => ({
  articles: state.articles,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getArticles }
)(Main);
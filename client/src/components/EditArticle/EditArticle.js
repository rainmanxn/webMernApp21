import React from 'react';
import styled from 'styled-components';
import { Form, Formik, useField } from 'formik';
import { Button, Input } from 'antd';
import { connect } from 'react-redux';
import { getArticles, patchArticle } from '../../actions/articleActions';
import PropTypes from 'prop-types';
import { getNameSelector, getUserSelector, isAuthSelector } from '../../redux/auth-selector';
import { currentArticleSelector } from '../../redux/articles-selectors';

const { TextArea } = Input;
const Container = styled.div`
  margin-left: 32px;
  width: 874px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  flex-grow: 0;
  margin-top: 21px;
`;
const Containertags = styled.div`
  //margin-bottom: 100px;
  width: 550px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  flex-grow: 0;
`;
const FormContainer = styled.div`
  width: 874px;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
`;
const BodyRegister = styled.div`
  background: #E5E5E5;
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
`
const Text = styled.div`
  width: 311px;
  margin: 48px auto 21px;
  font-family: Roboto,serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  color: #262626;
`
const LabelTag = styled.div`
  margin-left: 32px;
  margin-top: 20px;
`
const Wrapper = styled.div`
  width: 938px;
  margin-top: 59px;
  position: absolute; 
  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  box-sizing: border-box;
  box-shadow: 0px 0.608796px 2.93329px rgba(0, 0, 0, 0.0196802), 0px 1.46302px 7.04911px rgba(0, 0, 0, 0.0282725), 0px 2.75474px 13.2728px rgba(0, 0, 0, 0.035), 0px 4.91399px 23.6765px rgba(0, 0, 0, 0.0417275), 0px 9.19107px 44.2843px rgba(0, 0, 0, 0.0503198), 0px 22px 106px rgba(0, 0, 0, 0.07);
  border-radius: 6px;
`
const MyTextInput = ({ label, ...props }) => {
  let { id, name, errors } = props;
  const [field] = useField(props);
  if (!errors) {
    errors = ''
  }
  const color = '#D9D9D9'

  return (
    <Container>
      <label htmlFor={id || name}>{label}</label>
      <Input placeholder={label} style={{ width: 874, borderColor: color }} {...field} {...props} />
    </Container>
  );
};
const MyTextAreaInput = ({ label, ...props }) => {
  let { id, name, errors } = props;
  const [field] = useField(props);
  if (!errors) {
    errors = ''
  }
  const color = '#D9D9D9'

  return (
    <Container>
      <label htmlFor={id || name}>{label}</label>
      <TextArea placeholder={label} style={{ width: 874, borderColor: color }} autoSize={{ minRows: 10, maxRows: 10 }} {...field} {...props} />
    </Container>
  );
};
const MyTagsList = ({ label, ...props }) => {
  const { id, name, value } = props;
  const [field] = useField(props);
  let { tags, updatest } = props;
    // console.log(tags);

  const removetag = (id) => () => {
    tags = tags.filter((el) => el.id !== id);
    console.log(tags)
    updatest(tags)
  }
  return (
    <Container style={{marginTop: 5}}>
      <label htmlFor={id || name}>{label}</label>
      <Containertags style={{marginBottom: 1}}>
        <Input style={{width: 310}} placeholder='Tag' {...field} value={value} />
        <Button
          style={{borderColor: '#F5222D', color: '#F5222D'}}
          id="remove-button"
          className="addButton"
          onClick={removetag(id)}
        >
          Delete
        </Button>
      </Containertags>
    </Container>
  );
};
const MytagsInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { tags, updatest, value } = props;
  const addtag = () => {
    const element = {};
    element.value = meta.value;
    element.id = Date.now();
    updatest([...tags, element]);
  }
  return (
    <Container style={{marginTop: 5}}>
      <Containertags>
        <Input style={{width: 310}} placeholder='Tag' {...field} value={value} />
        <Button
          style={{borderColor: '#F5222D', color: '#F5222D'}}
          id="remove-button"
          className="addButton"
          onClick={addtag}
        >
          Delete
        </Button>
        <Button
          style={{borderColor: '#1890FF', color: '#1890FF'}}
          id="add-button"
          className="addButton"
          onClick={addtag}
        >
          Add tag
        </Button>
      </Containertags>
    </Container>
  );
};

class EditArticle extends React.Component {
  state = {
    tags: '',
    currentArticle: ''
  }


  componentDidMount() {
    const { getArticles, isAuth } = this.props;
    if (!isAuth) {
          this.props.history.push("/login");
        }
    getArticles();
  }

  updateState = (tags) => {
    this.setState(() => {return {tags}});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { getCurrentArticle, item } = this.props;
    let currentArticle = getCurrentArticle(item);
    let tags = this.state.tags;
    if (!currentArticle) {
      return null;
    }
    if (this.state.currentArticle === '') {
      this.setState(() => {return {currentArticle}})
    } else {
      currentArticle = this.state.currentArticle;
    }
    if (this.state.tags === '') {
      this.setState(() => {return {tags: currentArticle.tags}})
    }
    if (tags !== this.state.tags) {
      this.updateState(tags);
    }
  }

  render() {
    const { patchArticle, user, userName } = this.props;
    let { currentArticle, tags } = this.state;
    if (tags === '') return null;

    return (
      <BodyRegister>
        <Wrapper>
          <Text>Edit article</Text>
          <Formik
            initialValues={
              currentArticle
            }
            onSubmit={(fields) => {
              const { currentArticle, tags } = this.state;
              const { _id: id, likedUsers } = currentArticle;
              const { title, description, text } = fields;
              const articleFields = {
                title,
                description,
                text,
                tags,
                userName,
                _id: id,
                likedUsers
              }
              patchArticle(articleFields, id);
              this.props.history.push(`/articles/${id}`)
            }}
            render={() => (
              <Form id="myForm">
                <FormContainer>
                  <MyTextInput
                    label="Title"
                    name="title"
                    type="text"
                    id="title"
                    className="inputForm"
                  />
                  <MyTextInput
                    label="Short description"
                    name="description"
                    type="text"
                    id="description"
                    className="inputForm"
                  />
                  <MyTextAreaInput
                    label="Text"
                    name="text"
                    type="text"
                    id="text"
                    className="inputForm"
                  />
                  <LabelTag>Tags</LabelTag>
                  {tags.map(({ value, id }) => {
                    return (
                    <MyTagsList
                      value={value}
                      name={value}
                      type="text"
                      id={id}
                      className="inputForm"
                      key={`${id}+${value}+${new Date()}`}
                      tags={tags}
                      updatest={this.updateState}
                      label=""
                    />
                  )})}
                  <MytagsInput
                    label="Tags"
                    id="tag"
                    name="tag"
                    type="text"
                    className="inputForm"
                    tags={tags}
                    updatest={this.updateState}
                  />
                  {/*<Link to={`/articles/${id}`}>*/}
                  <Button type="primary" className="loginButton" form="myForm" key="submit" htmlType="submit">
                    Send
                  </Button>
                  {/*</Link>*/}
                </FormContainer>
              </Form>
            )}
          />
        </Wrapper>
      </BodyRegister>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: isAuthSelector(state),
  getCurrentArticle: currentArticleSelector(state),
  user: getUserSelector(state),
  userName: getNameSelector(state),
})

export default connect(
  mapStateToProps,
  { getArticles, patchArticle }
)(EditArticle);

MyTextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};



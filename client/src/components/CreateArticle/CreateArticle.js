import React from 'react';
import styled from 'styled-components';
import { Form, Formik, useField } from 'formik';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, setErrors } from '../../actions/authActions';
import PropTypes from 'prop-types';
import __ from 'lodash';

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

const Error = styled.div`
  font-family: Roboto,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  margin-left: 32px;
  color: tomato;
  &:last-child {
    margin-left: 5px;
  }
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

const MyPasswordInput = ({ label, ...props }) => {
  const { id, name } = props;
  const [field, meta] = useField(props);
  return (
    <Container>
      <label htmlFor={id || name}>{label}</label>
      <Input.Password style={{width: 874}} {...field} {...props} />
      {meta.touched && meta.error ? (
        <Error>{meta.error}</Error>
      ) : null}
    </Container>
  );
};

const MyTagsList = ({ label, ...props }) => {
  const { id, name } = props;
  const [field, meta] = useField(props);
  let { tags, updatestate } = props;

  const removetag = (id) => () => {
    console.log(tags);
    tags = tags.filter((el) => el.id !== id);
    console.log(tags)
    updatestate(tags)
  }
  return (
    <Container style={{marginTop: 5}}>
      <label htmlFor={id || name}>{label}</label>
      <Containertags style={{marginBottom: 1}}>
        <Input style={{width: 310}} placeholder='Tag' {...field} {...props} />
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
  const { id, name } = props;
  const [field, meta] = useField(props);
  const { tags, updatestate } = props;
  const addtag = () => {
    const element = {};
    element.value = meta.value;
    element.id = __.uniqueId();
    updatestate([...tags, element]);
  }
  return (
    <Container style={{marginTop: 5}}>
      <Containertags>
        <Input style={{width: 310}} placeholder='Tag' {...field} {...props} />
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

class CreateArticle extends React.Component {
  state = {
    tags: []
  }
  updatestate = (tags) => {
    this.setState({ tags });
    console.log(this.state.tags);
  }
  // componentDidMount() {
  //   if (this.props.auth.isAuth) {
  //     this.props.history.push("/dashboard");
  //   }
  // }
  //
  // componentDidUpdate(prevProps) {
  //   const { setErrors } = this.props;
  //   console.log('ERRORS:', this.props.errors)
  //   if (this.props.auth.isAuth) {
  //     this.props.history.push('/dashboard')
  //   }
  //   if (prevProps.errors !== this.props.errors) {
  //     setErrors(this.props.errors);
  //   }
  // }

  render() {
    const { errors } = this.props;
    const { tags } = this.state;
    return (
      <BodyRegister>
        <Wrapper>
          <Text>Create new article</Text>
          <Formik
            initialValues={
              this.props
            }
            onSubmit={(fields) => {
              // const { loginUser } = this.props;
              const { title, description, text } = fields;
              const { tags } = this.state;
              const articleFields = {
                title,
                description,
                text,
                tags
              }
              // loginUser(loggedUser);
              console.log('SUBMIT')
              console.log(articleFields)
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
                  {tags.map(({ value, id }) => (
                    <MyTagsList
                      value={value}
                      name={value}
                      type="text"
                      id={id}
                      className="inputForm"
                      key={id}
                      tags={tags}
                      updatestate={this.updatestate}
                      label=""
                    />
                  ))}
                  <MytagsInput
                    label="Tags"
                    id="tag"
                    name="tag"
                    type="text"
                    className="inputForm"
                    tags={tags}
                    updatestate={this.updatestate}
                  />
                  <Button type="primary" className="loginButton" form="myForm" key="submit" htmlType="submit">
                  Send
                  </Button>
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
  auth: state.auth,
  errors: state.errors,
  loading: state.loading
})

// export default connect(
//   mapStateToProps,
//   { loginUser, setErrors }
// )(CreateArticle);

MyTextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
MyPasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default CreateArticle;
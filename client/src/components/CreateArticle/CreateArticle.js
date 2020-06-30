import React from 'react';
import styled from 'styled-components';
import { Form, Formik, useField } from 'formik';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, setErrors } from '../../actions/authActions';
import PropTypes from 'prop-types';

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

const Wrapper = styled.div`
  width: 938px;
  height: 701px;
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

// const CreateArticle = () => {
//   return (
//   <BodyRegister>
//     <Wrapper>
//       <Text>
//         Create new article
//       </Text>
//     </Wrapper>
//   </BodyRegister>
//   )
// }

class CreateArticle extends React.Component {
  state = {
    skills: []
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
    return (
      <BodyRegister>
        <Wrapper>
          <Text>Create new article</Text>
          <Formik
            initialValues={
              this.props
            }
            onSubmit={(fields) => {
              const { loginUser } = this.props;
              const { email, password } = fields;
              const loggedUser = {
                email,
                password
              }
              loginUser(loggedUser);
              console.log(loggedUser)
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

                  {/*<Button type="primary" className="loginButton" form="myForm" key="submit" htmlType="submit" loading={this.props.auth.loading}>*/}
                  {/*  Login*/}
                  {/*</Button>*/}
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
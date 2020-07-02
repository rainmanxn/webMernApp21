import React from 'react';
import {
  Formik, Form, useField
} from 'formik';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import './Register.scss'
import { connect } from "react-redux";
import { loginUser, setErrors } from "../../actions/authActions";
import { Link } from 'react-router-dom';

const BottomText = styled.div`
  width: 319px;
  height: 20px;
  margin-left: 32px;
  margin-top: 8px;
  margin-bottom: 48px;
  font-family: Roboto,serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #8C8C8C;
`

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
  margin-left: 36.5px;
  margin-top: 48px;
  margin-bottom: 21px;
  font-family: Roboto,serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  color: #262626;
`

const Wrapper = styled.div`
  margin-top: 59px;
  position: absolute;
  width: 384px;
  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  box-sizing: border-box;
  box-shadow: 0px 0.608796px 2.93329px rgba(0, 0, 0, 0.0196802), 0px 1.46302px 7.04911px rgba(0, 0, 0, 0.0282725), 0px 2.75474px 13.2728px rgba(0, 0, 0, 0.035), 0px 4.91399px 23.6765px rgba(0, 0, 0, 0.0417275), 0px 9.19107px 44.2843px rgba(0, 0, 0, 0.0503198), 0px 22px 106px rgba(0, 0, 0, 0.07);
  border-radius: 6px;
`

const Container = styled.div`
  margin-left: 32px;
  width: 320px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  flex-grow: 0;
  margin-top: 10px;
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
  width: 320px;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
`;

const MyTextInput = ({ label, ...props }) => {
  let { id, name, errors } = props;
  const [field] = useField(props);
  if (!errors) {
    errors = ''
  }
  const colorEmail = errors.email ? 'red' : '#D9D9D9'

  return (
    <Container>
      <label htmlFor={id || name}>{label}</label>
      <Input style={{ width: 320, borderColor: colorEmail }} {...field} {...props} />
    </Container>
  );

};

const MyPasswordInput = ({ label, ...props }) => {
  const { id, name } = props;
  const [field, meta] = useField(props);
  return (
    <Container>
      <label htmlFor={id || name}>{label}</label>
      <Input.Password style={{width: 320}} {...field} {...props} />
      {meta.touched && meta.error ? (
        <Error>{meta.error}</Error>
      ) : null}
    </Container>
  );
};

class Login extends React.Component {

  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate(prevProps) {
    const { setErrors } = this.props;
    console.log('ERRORS:', this.props.errors)
    if (this.props.auth.isAuth) {
      this.props.history.push('/')
    }
    if (prevProps.errors !== this.props.errors) {
      setErrors(this.props.errors);
    }
  }

  render() {
    const { errors } = this.props;
    return (
      <BodyRegister>
        <Wrapper>
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
                <Text>Sign In</Text>
                <MyTextInput
                  label="Email"
                  name="email"
                  type="text"
                  id="email"
                  className="inputForm"
                />
                <Error className="red-text">
                  {errors ? errors.email : null}
                  {errors ? errors.emailnotfound : null}

                </Error>
                <MyPasswordInput
                  label="Password"
                  id="password"
                  name="password"
                  className="inputForm"
                  type="text"
                />
                <Error className="red-text">
                  {errors ? errors.password : null}
                  {errors ? errors.passwordincorrect : null}
                </Error>
                <Button type="primary" className="loginButton" form="myForm" key="submit" htmlType="submit" loading={this.props.auth.loading}>
                  Login
              </Button>
              </FormContainer>
            </Form>
          )}
        />
          <BottomText>Don’t have an account? <Link to='/register'>Sign Up.</Link></BottomText>
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

export default connect(
  mapStateToProps,
  { loginUser, setErrors }
)(Login);

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


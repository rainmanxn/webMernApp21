import React from 'react';
import {
  Formik, Form, useField
} from 'formik';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import './Register.css'
import { connect } from "react-redux";
import { loginUser, setErrors } from "../../actions/authActions";

const Container = styled.div`
  margin-left: 20px;
  width: 400px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  flex-grow: 0;
  margin-top: 10px;
`;

const Error = styled.div`
  margin-left: 20px;
  color: tomato;
  &:last-child {
    margin-left: 5px;
  }
`;

const FormContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
`;

const MyTextInput = ({ label, ...props }) => {
  const { id, name } = props;
  const [field, meta] = useField(props);
  return (
    <Container>
      <label htmlFor={id || name}>{label}</label>
      <Input {...field} {...props} />
      {meta.touched && meta.error ? (
        <Error>{meta.error}</Error>
      ) : null}
    </Container>
  );
};

const MyPasswordInput = ({ label, ...props }) => {
  const { id, name } = props;
  const [field, meta] = useField(props);
  return (
    <Container>
      <label htmlFor={id || name}>{label}</label>
      <Input.Password {...field} {...props} />
      {meta.touched && meta.error ? (
        <Error>{meta.error}</Error>
      ) : null}
    </Container>
  );
};

class Login extends React.Component {

  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push("/dashboard");
    }
  }

  componentDidUpdate(prevProps) {
    const { setErrors } = this.props;
    console.log('ERRORS:', this.props.errors)
    if (this.props.auth.isAuth) {
      this.props.history.push('/dashboard')
    }
    if (prevProps.errors !== this.props.errors) {
      setErrors(this.props.errors);
    }
  }

  render() {
    const { errors } = this.props;
    return (
      <>
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
                <Container><h1>Login Page</h1></Container>
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
                <Button type="primary" className="submitButton" form="myForm" key="submit" htmlType="submit" loading={this.props.auth.loading}>
                  Login
              </Button>
              </FormContainer>
            </Form>
          )}
        />
        <Container>Not registered yet?<a href='/register'>Register now</a></Container>
      </>
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


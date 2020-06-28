import React from 'react';
import { withRouter } from "react-router-dom";
import {
  Formik, Form, useField
} from 'formik';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import './Register.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, setErrors } from "../../actions/authActions";


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

class Register extends React.Component {

  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.props.history.push("/dashboard");
    }
  }

  componentDidUpdate(prevProps) {
    const { setErrors } = this.props;
    console.log('EEEERRR', this.props.errors.errors)
    if (prevProps.errors !== this.props.errors) {
      setErrors(this.props.errors);
    }
  }

  render() {
    const { errors } = this.props.errors;
    console.log('REBDER ERROR', errors);
    return (
      <>
        <Formik
          initialValues={
            this.props.errors
          }
          onSubmit={(fields) => {
            const { registerUser, history } = this.props;
            const { name, email, password, password2 } = fields;
            const newUser = {
              name, email, password, password2
            };
            registerUser(newUser, history)
            console.log(newUser)
          }}
          render={() => (
            <Form id="myForm">
              <FormContainer>
                <Container><h1>Register Page</h1></Container>
                <MyTextInput
                  label="Name"
                  name="name"
                  type="text"
                  id="firstName"
                  className="inputForm"
                />
                <Error className="red-text">
                  {errors ? errors.name : null}
                </Error>
                <MyTextInput
                  label="Email"
                  name="email"
                  type="text"
                  id="email"
                  className="inputForm"
                />
                <Error className="red-text">
                  {errors ? errors.email : null}
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
                </Error>
                <MyPasswordInput
                  label="Confirm Password"
                  id="password2"
                  name="password2"
                  className="inputForm"
                  type="text"
                />
                <Error className="red-text">
                  {errors ? errors.password2 : null}
                </Error>
                <Button type="primary" className="submitButton" form="myForm" key="submit" htmlType="submit" loading={this.props.auth.loading}>
                  Register
              </Button>
              </FormContainer>
            </Form>
          )}
        />
        <Container>Already have account?<a href='/login'>Login now</a></Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { registerUser, setErrors }
)(withRouter(Register));

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


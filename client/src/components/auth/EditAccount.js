import React from 'react';
import { withRouter, Link } from "react-router-dom";
import {
  Formik, Form, useField
} from 'formik';
import { Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import './Register.scss'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, setErrors, editUser } from "../../actions/authActions";
import { isAuthSelector, isLoadingSelector, getIdSelector } from '../../redux/auth-selector';
import { getErrorsSelector } from '../../redux/errors-selector';


const Line = styled.div`
  width: 320px;
  height: 0;
  margin-top: 21px;
  margin-bottom: 8px;
  margin-left: 32px;
  border: 1px solid #E8E8E8;
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

const ContainerCheckBox = styled.div`
  margin-left: 32px;
  width: 300px;
  display: flex;
  flex-grow: 0;
  margin-top: 10px;
`;

const MyTextInput = ({ label, ...props }) => {
  let { id, name, errors } = props;
  const [field] = useField(props);
  if (!errors) {
    errors = ''
  }
  const colorName = errors.name ? 'red' : '#D9D9D9'
  const colorEmail = errors.email ? 'red' : '#D9D9D9'
  if (name === 'name') {
    return (
      <Container>
        <label htmlFor={id || name}>{label}</label>
        <Input style={{ width: 320, borderColor: colorName }} {...field} {...props} />
      </Container>
    );
  }
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

class EditAccount extends React.Component {

  componentDidMount() {
    const { isAuth } = this.props;
    if (!isAuth) {
      this.props.history.push("/login");
    }
  }

  componentDidUpdate(prevProps) {
    const { setErrors, isAuth } = this.props;
    console.log('ERRORS:', this.props.errors)
    if (!isAuth) {
      this.props.history.push('/login')
    }
    if (prevProps.errors !== this.props.errors) {
      setErrors(this.props.errors);
    }
  }

  render() {
    const { errors, loading } = this.props;

    return (
      <BodyRegister>
        <Wrapper>
          <Formik
            initialValues={
              errors
            }
            onSubmit={(fields) => {
              const { editUser, id } = this.props;
              const { name, email, password, url } = fields;
              const newUser = {
                name, email, password, url, id
              };
              editUser(newUser);
            }}
            render={() => (
              <Form id="myForm">
                <FormContainer>
                  <Text>Edit profile</Text>
                  <MyTextInput
                    label="Username"
                    name="name"
                    type="text"
                    id="firstName"
                    className="inputForm"
                    errors={errors}
                  />
                  <MyTextInput
                    label="Email address"
                    name="email"
                    type="text"
                    id="email"
                    className="inputForm"
                    errors={errors}
                  />
                  <MyPasswordInput
                    label="New password"
                    id="password"
                    name="password"
                    className="inputForm"
                    type="text"
                  />
                  <MyTextInput
                    label="Avatar image (url)"
                    name="url"
                    type="text"
                    id="avatar"
                    className="inputForm"
                    errors={errors}
                  />
                  <Button type="primary" className="editSubmitButton" form="myForm" key="submit" htmlType="submit" loading={loading}>
                    Save
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
  id: getIdSelector(state),
  auth: state.auth,
  loading: isLoadingSelector(state),
  errors: getErrorsSelector(state),
  isAuth: isAuthSelector(state)
})

export default connect(
  mapStateToProps,
  { registerUser, setErrors, editUser }
)(withRouter(EditAccount));

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


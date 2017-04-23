import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import * as loaderActions from 'redux/modules/loader';
import { openSnackBar } from 'redux/modules/snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router';
const styles = require('./styles');

@connect(
  state => ({
    login: state.auth.login,
    password: state.auth.password,
    email: state.auth.email,
    photo: state.auth.photo,
    error: state.auth.error
  }),
  { ...authActions, ...loaderActions, openSnackBar })
export default class SignUpPage extends Component {

  static propTypes = {
    login: PropTypes.string,
    password: PropTypes.string,
    email: PropTypes.string,
    photo: PropTypes.string,
    error: PropTypes.object,
    stopLoad: PropTypes.func,
    startLoad: PropTypes.func,
    startSignUp: PropTypes.func,
    changeLogin: PropTypes.func,
    changePassword: PropTypes.func,
    changePhoto: PropTypes.func,
    changeEmail: PropTypes.func,
    clearStore: PropTypes.func,
    openSnackBar: PropTypes.func,
  }

  state = {
    submitFlag: false,
    file: null,
  }

  handleSubmit = () => {
    this.setState({ submitFlag: true });
    if (this.props.email && this.props.password && this.props.login) {
      this.props.startLoad();
      this.props.startSignUp(
        this.props.email,
        this.props.login,
        this.props.password,
        JSON.stringify(this.state.file),
      )
      .then(() => {
        browserHistory.push('/main');
      })
      .catch((err) => {
        this.props.openSnackBar({
          message: err.message,
        });
      })
      .finally(() => this.props.stopLoad());
    }
  }

  handleLoginChange = (event) => {
    this.setState({ submitFlag: false });
    this.props.changeLogin(event.target.value);
  }

  handlePasswordChange = (event) => {
    this.setState({ submitFlag: false });
    this.props.changePassword(event.target.value);
  }

  handleEmailChange = (event) => {
    this.setState({ submitFlag: false });
    this.props.changeEmail(event.target.value);
  }

  handleUploadPhoto = (event) => {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append('file', file);
    this.setState({
      file: file,
    });
    const newFile = { ...file };
    console.log(file);
    console.log(newFile);
    this.props.changePhoto(JSON.stringify(newFile));
  }

  render() {
    const {
      email,
      login,
      password,
    } = this.props;

    return (
      <div style={styles.SignUpPage}>
        <Helmet title="Sign Up"/>
        <span style={styles.SignUpPage__header}>
          Welcome to the Family
        </span>
        <TextField
          id="sign_up_email"
          value={email}
          hintText="E-mail"
          errorText={this.state.submitFlag && !email && "This field is required."}
          floatingLabelText="E-mail"
          style={{ ...styles.SignUpPage__input, marginTop: '26px' }}
          onChange={this.handleEmailChange}
        />
        <TextField
          id="sign_up_login"
          value={login}
          hintText="Login"
          errorText={this.state.submitFlag && !login && "This field is required."}
          floatingLabelText="Login"
          style={styles.SignUpPage__input}
          onChange={this.handleLoginChange}
        />
        <TextField
          id="sign_up_password"
          value={password}
          hintText="Password"
          errorText={this.state.submitFlag && !password && "This field is required."}
          type="password"
          floatingLabelText="Password"
          style={styles.SignUpPage__input}
          onChange={this.handlePasswordChange}
        />
        <RaisedButton
          label="Photo"
          containerElement="label"
          primary
          style={styles.uploadButton}
        >
          <input
            id="signUpUploadFile"
            type="file"
            accept="image/*"
            style={styles.photoInput}
            onChange={this.handleUploadPhoto}
          />
        </RaisedButton>
        <RaisedButton
          label="Sign Up"
          primary
          style={styles.SignUpPage__submitButton}
          onClick={this.handleSubmit}
        />
      </div>
    );
  }
}

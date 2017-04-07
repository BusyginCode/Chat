import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import * as loaderActions from 'redux/modules/loader';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router';
import Snackbar from 'material-ui/Snackbar';

@connect(
  state => ({
    login: state.auth.login,
    password: state.auth.password,
    rememberMe: state.auth.rememberMe,
    nickname: state.auth.nickname,
    signIn: state.auth.signIn,
    error: state.auth.error
  }),
  { ...authActions, ...loaderActions })
export default class SignInPage extends Component {

  static propTypes = {
    password: PropTypes.string,
    login: PropTypes.string,
    clearStore: PropTypes.func,
    startLoad: PropTypes.func,
    stopLoad: PropTypes.func,
    handleLogin: PropTypes.func,
    changeLogin: PropTypes.func,
    changePassword: PropTypes.func,
  }

  state = {
    submitErrorMessage: '',
    submitFlag: false,
  }

  componentWillUnmount() {
    this.props.clearStore();
  }

  handleSubmit = () => {
    this.setState({ submitFlag: true });
    if (this.props.login && this.props.password) {
      this.props.startLoad();
      this.props.handleLogin(this.props.login, this.props.password)
        .then((res) => {
          if (res.token) {
            browserHistory.replace('/main');
          }
        })
        .catch((err) => this.setState({ submitErrorMessage: err.message }))
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

  handleRequestCloseNotification = () =>
    this.setState({ submitErrorMessage: '' });

  render() {
    const styles = require('./styles');

    const {
      login,
      password,
    } = this.props;

    return (
      <div style={styles.SignInPage}>
        <Helmet title="Sign In"/>
        <span style={styles.SignInPage__header}>Please Authorise</span>
        <TextField
          id="sign_in_email"
          value={login}
          errorText={this.state.submitFlag && !login && "This field is required."}
          floatingLabelText="E-mail"
          hintText = "E-mail"
          style={styles.SignInPage__input}
          onChange={this.handleLoginChange}
        />
        <TextField
          id="sign_in_password"
          value={password}
          type="password"
          errorText={this.state.submitFlag && !password && "This field is required."}
          floatingLabelText="Password"
          hintText = "Password"
          style={styles.SignInPage__input}
          onChange={this.handlePasswordChange}
        />
        <RaisedButton
          label="Enter"
          className="test"
          primary
          style={styles.SignInPage__submitButton}
          onClick={this.handleSubmit}
        />
        <Snackbar
          open={Boolean(this.state.submitErrorMessage)}
          message={this.state.submitErrorMessage}
          autoHideDuration={2000}
          onRequestClose={this.handleRequestCloseNotification}
          bodyStyle={styles.SignInPage__errorNotification}
        />
      </div>
    );
  }
}

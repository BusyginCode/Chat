import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import * as loaderActions from 'redux/modules/loader';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { RadioButton } from 'material-ui/RadioButton';
import { browserHistory } from 'react-router'
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

  state = {
    submitErrorMessage: '',
    submitFlag: false,
  }

  componentWillUnmount() {
    this.props.clearStore()
  }

  handleSubmit = (event) => {
    this.setState({ submitFlag: true });
    if (this.props.login && this.props.password) {
      this.props.startLoad();
      this.props.handleLogin(this.props.login, this.props.password)
        .then((res) => {
          if (res.token) {
            browserHistory.replace('/main')
          }
        })
        .catch((err) => this.setState({ submitErrorMessage: err.message }))
        .finally(() => this.props.stopLoad())
    }
  }

  handleLoginChange = (e) => {
    this.setState({ submitFlag: false })
    this.props.changeLogin(e.target.value)
  }

  handlePasswordChange = (e) => {
    this.setState({ submitFlag: false })
    this.props.changePassword(e.target.value);
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
          value={login}
          errorText={ this.state.submitFlag && !login && "This field is required." }
          hintText = "E-mail" 
          floatingLabelText="E-mail"
          style={styles.SignInPage__input}
          onChange={this.handleLoginChange}
        />
        <TextField 
          value={password}  
          type="password"
          errorText={ this.state.submitFlag && !password && "This field is required." }
          floatingLabelText="Password"
          hintText = "Password" 
          style={styles.SignInPage__input}
          onChange={this.handlePasswordChange}
        />
        <RaisedButton 
          label="Enter" 
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

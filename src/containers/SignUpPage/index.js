import React, {Component, PropTypes} from 'react';
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
    email: state.auth.email,
    error: state.auth.error
  }),
  {...authActions, ...loaderActions})
export default class SignUpPage extends Component {

  static propTypes = {
    login: PropTypes.string,
    password: PropTypes.string,
    email: PropTypes.string,
    error: PropTypes.object,
    stopLoad: PropTypes.func,
    startLoad: PropTypes.func,
    handleSignUp: PropTypes.func,
    changeLogin: PropTypes.func,
    changePassword: PropTypes.func,
    changeEmail: PropTypes.func,
    clearStore: PropTypes.func,
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
    if (this.props.email && this.props.password && this.props.login) {
      this.props.startLoad();
      this.props.handleSignUp(
        this.props.email,
        this.props.login,
        this.props.password
      )
      .then(() => {
        browserHistory.push('/main');
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

  handleEmailChange = (event) => {
    this.setState({ submitFlag: false });
    this.props.changeEmail(event.target.value);
  }

  handleRequestCloseNotification = () =>
    this.setState({ submitErrorMessage: '' });

  render() {
    const styles = require('./styles');

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
          value={email}
          hintText="E-mail"
          errorText={this.state.submitFlag && !email && "This field is required."}
          floatingLabelText="E-mail"
          style={{ ...styles.SignUpPage__input, marginTop: '26px' }}
          onChange={this.handleEmailChange}
        />
        <TextField
          value={login}
          hintText="Login"
          errorText={this.state.submitFlag && !login && "This field is required."}
          floatingLabelText="Login"
          style={styles.SignUpPage__input}
          onChange={this.handleLoginChange}
        />
        <TextField
          value={password}
          hintText="Password"
          errorText={this.state.submitFlag && !password && "This field is required."}
          type="password"
          floatingLabelText="Password"
          style={styles.SignUpPage__input}
          onChange={this.handlePasswordChange}
        />
        <RaisedButton
          label="Sign Up"
          primary
          style={styles.SignUpPage__submitButton}
          onClick={this.handleSubmit}
        />
        <Snackbar
          open={Boolean(this.state.submitErrorMessage)}
          message={this.state.submitErrorMessage}
          autoHideDuration={2000}
          onRequestClose={this.handleRequestCloseNotification}
          bodyStyle={styles.SignUpPage__errorNotification}
        />
      </div>
    );
  }
}

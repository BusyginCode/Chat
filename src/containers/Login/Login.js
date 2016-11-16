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
export default class Login extends Component {

  handleSubmit = (event) => {
    this.props.handleLogin()
    browserHistory.push('/main')
  }

  render() {
    const styles = require('./LoginStyles.js')

    const { 
      changeLogin,
      changePassword,
      clearForm,
      changeRemember,
      signTypeChange,
      changeNickname
    } = this.props;

    const disableButtonStyle = !this.props.login || !this.props.password ? styles.disableButton : {}

    return (
      <div style={ styles.formStyle }>
        <Helmet title="Sign In"/>
        <span style={ styles.headerStyle }>Please Authorise</span>
        <TextField 
          value={ this.props.login }
          hintText = "E-mail" 
          floatingLabelText="E-mail"
          style={ styles.textFields }
          onChange={ (e) => changeLogin(e.target.value) }
        />
        <TextField 
          value={ this.props.password  }  
          hintText = "Пароль" 
          type="password"
          floatingLabelText="Пароль"
          style={ styles.textFields }
          onChange={ (e) => changePassword(e.target.value) }
        />
        <RaisedButton 
          label="Enter" 
          primary
          style={{ ...styles.buttonStyle, ...disableButtonStyle }} 
          onClick={ this.props.login && this.props.password ? this.handleSubmit : () => {} }
        />
      </div>
    );
  }
}

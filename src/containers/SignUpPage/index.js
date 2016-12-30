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
import { Notification } from 'containers'

@connect(
  state => ({
    login: state.auth.login,
    password: state.auth.password,
    email: state.auth.email,
    error: state.auth.error
  }),
  {...authActions, ...loaderActions})
export default class SignUpPage extends Component {

  handleSubmit = (event) => {
    this.props.handleSignUp(
      this.props.email,
      this.props.login,
      this.props.password
    )
    .then((res) => {
      browserHistory.push('/main');
    })
    .catch((err) => {
      console.log('SIGN UP CATCH')
    })
  };

  render() {
    const styles = require('../Login/LoginStyles.js')

    const { 
      changeLogin,
      changePassword,
      clearForm,
      changeRemember,
      signTypeChange,
      changeEmail
    } = this.props;

    const disableButtonStyle = !this.props.email || 
      !this.props.password || !this.props.login ? styles.disableButton : {}

    console.log(this.props.email, this.props.password, this.props.login)
    
    return (
      <div style={ styles.formStyle }>
        <Helmet title="Sign Up"/>
        <span style={ styles.headerStyle }>Welcome to the Family</span>
        <TextField 
          value={ this.props.email }
          hintText = "E-mail" 
          floatingLabelText="E-mail"
          style={ styles.textFields }
          onChange={ (e) => changeEmail(e.target.value) }
        />
        <TextField 
          value={ this.props.login }
          hintText="Login" 
          floatingLabelText="Login"
          style={ styles.textFields }
          onChange={ (e) => changeLogin(e.target.value) }
        />
        <TextField 
          value={ this.props.password  }  
          hintText = "Password" 
          type="password"
          floatingLabelText="Password"
          style={ styles.textFields }
          onChange={ (e) => changePassword(e.target.value) }
        />
        <RaisedButton 
          label="Sign Up"
          primary 
          style={{ ...styles.buttonStyle, ...disableButtonStyle }} 
          onClick={ this.props.email && this.props.password && this.props.login ? this.handleSubmit : () => {} }
        />
      </div>
    );
  }
}

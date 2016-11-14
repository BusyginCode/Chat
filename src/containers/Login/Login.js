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
    rememberMe: state.auth.rememberMe,
    nickname: state.auth.nickname,
    signIn: state.auth.signIn,
    error: state.auth.error
  }),
  { ...authActions, ...loaderActions })
export default class Login extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.startLoad()
    this.props.handleLogin(this.props.login, this.props.password)
    .then(() => browserHistory.replace('/my'))
    .catch(() => {})
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
      <div style={ styles.loginContainerStyle }>
        <div className="page-wrappers" style={ styles.backgroundLogin }>
          <section className="jumbotron-custom full-vh" data-pages="parallax">
            <div className="background jumbo-back" data-pages-bg-image="/hero_1.jpg" style={{backgroundImage: "url(/hero.jpg)"}}>
              <div className="bg-overlay" style={{ opacity: 0 }}></div>
            </div>
          </section>
        </div>
        <div style={ styles.formStyle }>
          <Helmet title="Авторизация"/>
          <h1 style={ styles.headerStyle }>Авторизация</h1>
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
          <Checkbox
            value={ this.props.rememberMe }
            label="Запомнить меня"
            style={ styles.remember }
            onChange={ () => changeRemember(!this.props.rememberMe) }
          />
          <RaisedButton 
            label="Войти" 
            style={{ ...styles.buttonStyle, ...disableButtonStyle }} 
            onClick={ this.props.login && this.props.password ? this.handleSubmit : () => {} }
          />
          <Notification show={ this.props.error } message={ this.props.error } />
        </div>
      </div>
    );
  }
}

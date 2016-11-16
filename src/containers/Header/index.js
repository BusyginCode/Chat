import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as authActions from 'redux/modules/auth';
import { Link } from 'react-router'
import * as loaderActions from 'redux/modules/loader';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router'

@connect(
  state => ({
    token: state.auth.token,
  }),
  authActions
)
export default class Header extends Component {

  constructor() {
    super()
    this.state = {
      passPoll: null
    }
  }

  handleExit = () => {
    this.props.deleteAuthStoreToken();
    browserHistory.replace('/')
  }

  renderLinks() {
    const styles = require('./headerStyles.js')
    return (
      this.props.token ? 
        <ul style={ styles.menu }>
          <li onClick={this.handleExit} style={ styles.link }>
            <a>Exit</a>
          </li>
        </ul>
      : <ul style={ styles.menu }>
          <li style={ styles.link }>
            <Link to="/signIn">Sign In</Link>
          </li>
          <li style={ styles.link }>
            <Link to="/signUp">Sign Up</Link>
          </li>
        </ul>
    )
  }

  render() {
  	const styles = require('./headerStyles.js')
    return (
      <nav style={ styles.headerContainer }>
        { this.renderLinks() }
      </nav>
    );
  }
}
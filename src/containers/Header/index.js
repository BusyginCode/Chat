import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  deleteAuthToken,
  deleteAuthStoreToken,
} from 'redux/modules/auth';
import { clearFriends } from 'redux/modules/friends';
import { Link, browserHistory } from 'react-router';
const styles = require('./headerStyles.js');
const logo = require('./img/chat.svg');

@connect(
  state => ({
    token: state.auth.token,
  }),
  { deleteAuthStoreToken, clearFriends }
)
export default class Header extends Component {

  static propTypes = {
    token: PropTypes.string,
    clearFriends: PropTypes.func,
    deleteAuthStoreToken: PropTypes.func,
  }

  handleExit = () => {
    deleteAuthToken();
    this.props.deleteAuthStoreToken();
    this.props.clearFriends();
    browserHistory.replace('/');
  }

  renderLinks() {
    return (
      this.props.token ?
        <div style={styles.menu}>
          <Link style={styles.link} to="/">Home</Link>
          <Link style={styles.link} to="/main">Main</Link>
          <div onClick={this.handleExit} style={ styles.link }>
            Exit
          </div>
        </div>
      : <div style={styles.menu}>
          <Link style={styles.link} to="/">Home</Link>
          <Link style={styles.link} to="/signIn">Sign In</Link>
          <Link style={styles.link} to="/signUp">Sign Up</Link>
        </div>
    );
  }

  render() {
    return (
      <nav style={ styles.headerContainer }>
        <div style={ styles.headerTitleContainer }>
          <img style={styles.headerLogo} src={logo} alt="#" />
          <span style={ styles.headerTitle }>Little Chat</span>
        </div>
        { this.renderLinks() }
      </nav>
    );
  }
}

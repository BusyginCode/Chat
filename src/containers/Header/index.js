import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  deleteAuthToken,
  deleteAuthStoreToken,
} from 'redux/modules/auth';
import { Link } from 'react-router'
import * as loaderActions from 'redux/modules/loader';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router'

@connect(
  state => ({
    token: state.auth.token,
  })
)
export default class Header extends Component {

  constructor() {
    super()
    this.state = {
      passPoll: null
    }
  }

  handleExit = () => {
    deleteAuthToken();
    this.props.dispatch(deleteAuthStoreToken());
    browserHistory.replace('/')
  }

  renderLinks() {
    const styles = require('./headerStyles.js')
    return (
      this.props.token ? 
        <div style={styles.menu}>
          <Link style={styles.link} to="/main">Main</Link>
          <div onClick={this.handleExit} style={ styles.link }>
            Exit
          </div>
        </div>
      : <div style={styles.menu}>
          <Link style={styles.link} to="/signIn">Sign In</Link>
          <Link style={styles.link} to="/signUp">Sign Up</Link>
        </div>
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
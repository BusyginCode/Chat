import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  deleteAuthToken,
  deleteAuthStoreToken,
} from 'redux/modules/auth';
import { Link, browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

@connect(
  state => ({
    token: state.auth.token,
  }),
  { deleteAuthStoreToken }
)
export default class Header extends Component {

  static propTypes = {
    token: PropTypes.string,
    deleteAuthStoreToken: PropTypes.func,
  }

  state = {
    searchText: '',
  }

  handleChangeSearchText = (event) => {
    console.log(event, event.keyCode);
    this.setState({ searchText: e.target.value });
  }

  handleSubmit = () => {}

  handleExit = () => {
    deleteAuthToken();
    this.props.deleteAuthStoreToken();
    browserHistory.replace('/');
  }

  renderLinks() {
    const styles = require('./headerStyles.js');
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
    const styles = require('./headerStyles.js');
    return (
      <nav style={ styles.headerContainer }>
        <span style={ styles.headerTitle }>Little Chat</span>
        <TextField
          style={{height: '50px'}}
          value={this.state.searchText}
          floatingLabelText="Find friends"
          hintText = "Search"
          onChange={this.handleChangeSearchText}
        />
        <RaisedButton label="Search" onClick={this.handleSubmit} />
        { this.renderLinks() }
      </nav>
    );
  }
}

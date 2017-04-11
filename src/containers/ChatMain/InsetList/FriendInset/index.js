import React, { Component, PropTypes } from 'react';
import './friend-inset.scss';

export default class FriendInset extends Component {

  static propTypes = {
    login: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }

  render() {
    const styles = require('./styles');
    const { login, logo } = this.props;
    return (
      <div className="FriendInset" style={styles.friendInset}>
        <div style={styles.friendInsetLogo}>{logo}</div>
        <div style={styles.friendInsetLogin}>{login}</div>
      </div>
    );
  }
}

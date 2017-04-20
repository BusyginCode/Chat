import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './friend-inset.scss';

export default class FriendInset extends Component {

  static propTypes = {
    login: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    onRemoveFriends: PropTypes.func,
  }

  render() {
    const styles = require('./styles');
    const { login, logo, onRemoveFriends } = this.props;
    return (
      <div className="FriendInset" style={styles.friendInset}>
        <div style={styles.friendInsetLogo}>{logo}</div>
        <div style={styles.friendInsetLogin}>{login}</div>
        <RaisedButton
          label="Remove Friend"
          onClick={onRemoveFriends}
        />
      </div>
    );
  }
}

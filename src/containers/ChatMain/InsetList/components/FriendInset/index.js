import React, { Component, PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import './friend-inset.scss';
const styles = require('./styles');

export default class FriendInset extends Component {

  static propTypes = {
    login: PropTypes.string.isRequired,
    logo: PropTypes.string,
    onRemoveFriends: PropTypes.func,
  }

  render() {
    const { login, logo, onRemoveFriends } = this.props;
    return (
      <div className="FriendInset" style={styles.friendInset}>
        <div style={styles.friendInsetLogo}>{logo}</div>
        <div
          className="FriendInset__login"
          style={styles.friendInsetLogin}
        >
          {login}
        </div>
        <FloatingActionButton
          mini
          onClick={onRemoveFriends}
          title="Remove friend"
        >
          <ContentClear />
        </FloatingActionButton>
      </div>
    );
  }
}

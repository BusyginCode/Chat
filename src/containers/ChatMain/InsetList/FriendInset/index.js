import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './friend-inset.scss';

export default class FriendInset extends Component {

  static propTypes = {
    login: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    onAddInFrieds: PropTypes.func,
  }

  render() {
    const styles = require('./styles');
    const { login, logo, onAddInFrieds } = this.props;
    return (
      <div className="FriendInset" style={styles.friendInset}>
        <div style={styles.friendInsetLogo}>{logo}</div>
        <div style={styles.friendInsetLogin}>{login}</div>
        {onAddInFrieds &&
          <RaisedButton
            label="Make Friend"
            onClick={onAddInFrieds}
          />
        }
      </div>
    );
  }
}

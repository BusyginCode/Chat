import React, { Component, PropTypes } from 'react';
import styles from './styles';
import './menu-bar.scss';

import friensLogo from './img/friends.png';
import chatsLogo from './img/chats.png';

export default class MenuBar extends Component {

  static propTypes = {
    handleChangeMenuInset: PropTypes.func.isRequired,
    choosenInset: PropTypes.string.isRequired,
  };

  handleFriendInsetClick = () => this.props.handleChangeMenuInset('friends');

  handleChatsInsetClick = () => this.props.handleChangeMenuInset('chats');

  render() {
    const { choosenInset } = this.props;
    return (
      <div style={styles.menuBar}>
        <div
          className={choosenInset === 'friends' ? "MenuBar__inset-active" : "MenuBar__inset"}
          style={styles.inset}
          onClick={this.handleFriendInsetClick}
        >
          <img src={friensLogo} className="MenuBar__inset-logo" style={styles.insetLogo} />
          <div className="MenuBar__inset-title" style={styles.insetTitle}>Friends</div>
        </div>
        <div
          className={choosenInset === 'chats' ? "MenuBar__inset-active" : "MenuBar__inset"}
          style={styles.inset}
          onClick={this.handleChatsInsetClick}
        >
          <img src={chatsLogo} className="MenuBar__inset-logo" style={styles.insetLogo} />
          <div className="MenuBar__inset-title" style={styles.insetTitle}>Chats</div>
        </div>
      </div>
    );
  }
}

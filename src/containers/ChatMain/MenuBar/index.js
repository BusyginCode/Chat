import React, { Component } from 'react';
import './menu-bar.scss';

export default class MenuBar extends Component {
  render() {
    const styles = require('./styles');
    const friensLogo = require('./img/friends.png');
    const talksLogo = require('./img/talks.png');
    const chatsLogo = require('./img/chats.png');

    return (
      <div style={styles.menuBar}>
        <div className="MenuBar__inset" style={styles.inset}>
          <img src={friensLogo} style={styles.insetLogo} />
          <div>Friends</div>
        </div>
        <div className="MenuBar__inset" style={styles.inset}>
          <img src={talksLogo} style={styles.insetLogo} />
          <div>Talks</div>
        </div>
        <div className="MenuBar__inset" style={styles.inset}>
          <img src={chatsLogo} style={styles.insetLogo} />
          <div>Chats</div>
        </div>
      </div>
    );
  }
}

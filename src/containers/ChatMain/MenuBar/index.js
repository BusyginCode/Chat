import React, { Component } from 'react';
import './menu-bar.scss';

export default class MenuBar extends Component {
  render() {
    const styles = require('./styles');
    const peopleLogo = require('./img/person.png');

    return (
      <div style={styles.menuBar}>
        <div className="MenuBar__inset" style={styles.inset}>
          <img src={peopleLogo} style={styles.insetLogo} />
        </div>
        <div className="MenuBar__inset" style={styles.inset}>
          <img src={peopleLogo} style={styles.insetLogo} />
        </div>
      </div>
    );
  }
}

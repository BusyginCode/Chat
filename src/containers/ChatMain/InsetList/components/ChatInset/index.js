import React, { Component, PropTypes } from 'react';
import './chat-inset.scss';

export default class ChatInset extends Component {

  static propTypes = {
    participants: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired,
    lastMessage: PropTypes.string.isRequired,
  }

  render() {
    const styles = require('./styles');
    const { participants, date, lastMessage } = this.props;

    return (
      <div className="ChatInset" style={styles.chatInset}>
        <div style={styles.chatInsetText}>
          <div style={styles.chatInsetParticipant}>{participants[0]}</div>
          <div style={styles.chatInsetLastMessage}>{lastMessage}</div>
        </div>
        <div style={styles.chatInsetDate}>
          {date}
        </div>
      </div>
    );
  }
}

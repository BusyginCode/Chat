import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ChatReduser from 'redux/modules/chat';
import FriendInset from './FriendInset';
import ChatInset from './ChatInset';

var friends = [ // eslint-disable-line
  {
    login: 'Dima',
    logo: 'logo',
  },
  {
    login: 'Dima',
    logo: 'logo',
  },
  {
    login: 'Dima',
    logo: 'logo',
  },
  {
    login: 'Dima',
    logo: 'logo',
  },
  {
    login: 'Dima',
    logo: 'logo',
  },
];

var chats = [ // eslint-disable-line
  {
    participants: ['Dima'],
    date: "28/10/1997",
    lastMessage: 'Message'
  },
  {
    participants: ['Dima'],
    date: "28/10/1997",
    lastMessage: 'Message'
  },
  {
    participants: ['Dima'],
    date: "28/10/1997",
    lastMessage: 'Message'
  },
  {
    participants: ['Dima'],
    date: "28/10/1997",
    lastMessage: 'Message'
  },
  {
    participants: ['Dima'],
    date: "28/10/1997",
    lastMessage: 'Message'
  },
];

@connect(
  state => ({
    choosenMenuInset: state.chat.choosenMenuInset,
  }),
  { ...ChatReduser }
)
export default class InsetList extends Component {

  static propTypes = {
    choosenMenuInset: PropTypes.string,
  }

  getInsets() {
    switch (this.props.choosenMenuInset) {
    case 'friends': return friends.map(friend => <FriendInset key={Math.random()} {...friend} />);
    case 'chats': return chats.map(chat => <ChatInset key={Math.random()} {...chat} />);
    default: return [];
    }
  }

  render() {
    const styles = require('./styles');

    return (
      <div style={styles.insetList}>
        {this.getInsets()}
      </div>
    );
  }
}

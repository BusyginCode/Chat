import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import InsetList from './InsetList';
import MenuBar from './MenuBar';
import Chat from './Chat';
import io from 'socket.io-client';

@connect()
export default class ChatMain extends Component {

  constructor() {
    super();
    this.socket = io('http://localhost:8001');
  }

  componentDidMount() {
    this.socket.on('message', (text) => console.log(text)); // eslint-disable-line
  }

  handleSend = () => {
    this.socket.emit('message', "Client World!");
  }

  render() {
    const styles = require('./styles.js');

    return (
      <div style={styles.chatContainer}>
        <Helmet title="Chat"/>
        <div style={styles.menuBar}>
          <MenuBar />
        </div>
        <div style={styles.menuContainer}>
          <InsetList />
        </div>
        <div style={styles.chat}>
          <Chat />
        </div>
      </div>
    );
  }
}

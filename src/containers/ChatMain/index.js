import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as loaderActions from 'redux/modules/loader';
import Helmet from 'react-helmet';
import io from 'socket.io-client';

@connect()
export default class ChatMain extends Component {

  constructor() {
    super();
    this.socket = io('http://localhost:8001');
  }

  componentDidMount() {
    this.socket.on('message', (text) => console.log(text));
  }

  handleSend = () => {
    this.socket.emit('message', "Client World!");
  }

  render() {
    return (
      <div className="page-wrappers">
        <Helmet title="Chat"/>
        Hello Chat
        <button onClick={this.handleSend}>Send</button>
      </div>
    );
  }
}

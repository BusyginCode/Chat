import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

@connect()
export default class ChatMain extends Component {

  render() {
    return (
      <div className="page-wrappers">
        <Helmet title="Chat"/>
        Hello Chat
      </div>
    );
  }
}
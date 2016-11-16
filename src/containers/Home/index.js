import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

@connect()
export default class Home extends Component {

  render() {
    return (
      <div className="page-wrappers">
      <Helmet title="Main"/>
        <h2>Hello, my name is Dima and, this is my chat!</h2> 
        <p>If your read this, you want to test some of my opensource code. You're welcome!</p>
      </div>
    );
  }
}
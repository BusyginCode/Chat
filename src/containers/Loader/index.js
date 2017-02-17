import React, { Component } from 'react';
import Loader from 'react-loader';
import ProgressBar from 'react-progress-bar-plus';
import { connect } from 'react-redux';

@connect(state => ({
  load: state.loader.load
}))
export default class ReactLoader extends Component {
  render() {
    return (
      <ProgressBar percent={this.props.load} intervalTime={100} autoIncrement spinner={false} />
    );
  }
}

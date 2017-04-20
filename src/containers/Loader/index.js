import React, { Component, PropTypes } from 'react';
import ProgressBar from 'react-progress-bar-plus';
import { connect } from 'react-redux';

@connect(state => ({
  load: state.loader.load
}))
export default class ReactLoader extends Component {

  static propTypes = {
    load: PropTypes.number,
  }

  render() {
    return (
      <ProgressBar percent={this.props.load} intervalTime={100} autoIncrement spinner={false} />
    );
  }
}

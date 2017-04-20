import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import * as SnackBarReducer from 'redux/modules/snackbar';
const styles = require('./styles');

@connect(
  state => ({
    isOpen: state.snackbar.isOpen,
    message: state.snackbar.message,
    duration: state.snackbar.duration,
    type: state.snackbar.type,
    className: state.snackbar.className,
  }),
  SnackBarReducer
)
export default class SnackBar extends Component {

  static propTypes = {
    type: PropTypes.string,
    isOpen: PropTypes.bool,
    message: PropTypes.string,
    duration: PropTypes.number,
    className: PropTypes.string,
    closeSnackBar: PropTypes.func,
  }

  getSnackStyle() {
    switch (this.props.type) {
      case 'error': return styles.error;
      case 'success': return styles.success;
      case 'warning': return styles.warning;
      default: return {};
    }
  }

  render() {
    return (
      <Snackbar
        open={this.props.isOpen}
        message={this.props.message}
        autoHideDuration={this.props.duration}
        onRequestClose={this.props.closeSnackBar}
        bodyStyle={{...styles.snackBar, ...this.getSnackStyle()}}
        className={this.props.className}
      />
    );
  }
}

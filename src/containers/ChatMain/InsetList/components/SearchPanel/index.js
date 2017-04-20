import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Spinner from '../../../../../components/Spinner';
import RaisedButton from 'material-ui/RaisedButton';
const styles = require('./styles');

export default class SearchPanel extends Component {

  static propTypes = {
    onSubmit: PropTypes.func,
    onSearchTextChange: PropTypes.func,
    searchText: PropTypes.string,
    isSubmit: PropTypes.bool,
    choosenMenuInset: PropTypes.string,
  }

  render() {
    const {
      onSubmit,
      onSearchTextChange,
      searchText,
      isSubmit,
      choosenMenuInset
    } = this.props;

    return (
      choosenMenuInset === 'friends' &&
        <div style={styles.searchPanel}>
          {!isSubmit &&
            <div style={styles.inputContainer}>
              <TextField
                style={styles.textFieldStyle}
                inputStyle={styles.textFieldInputStyle}
                value={searchText}
                floatingLabelText="Find friends"
                hintText="Search"
                onChange={onSearchTextChange}
              />
              <RaisedButton
                style={styles.submitButton}
                label="Search"
                onClick={onSubmit}
              />
            </div>
          }
          {isSubmit && <Spinner />}
        </div>
    );
  }
}

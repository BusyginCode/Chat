import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
const styles = require('./styles');

export default class SearchPanel extends Component {

  static propTypes = {
    onSubmit: PropTypes.func,
    onSearchTextChange: PropTypes.func,
    searchText: PropTypes.string,
    choosenMenuInset: PropTypes.string,
  }

  state = {
    isSubmit: false,
  }

  handleSubmit = () => {
    this.setState({ isSubmit: true });
    if (this.props.searchText) {
      this.props.onSubmit()
        .finally(() => this.setState({ isSubmit: false }));
    }
  }

  handleChange = (event) => {
    this.setState({ isSubmit: false });
    this.props.onSearchTextChange(event);
  }

  render() {
    const {
      searchText,
      choosenMenuInset
    } = this.props;
    return (
      choosenMenuInset === 'friends' &&
        <div style={styles.searchPanel}>
          <div style={styles.inputContainer}>
            <TextField
              id="SearchPanel__input"
              style={styles.textFieldStyle}
              inputStyle={styles.textFieldInputStyle}
              errorText={this.state.isSubmit && !searchText && "This field is required."}
              value={searchText}
              floatingLabelText="Find friends"
              hintText="Search"
              onChange={this.handleChange}
            />
            <RaisedButton
              style={styles.submitButton}
              label="Search"
              primary
              onClick={this.handleSubmit}
            />
          </div>
        </div>
    );
  }
}

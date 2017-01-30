import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  storeAuthToken,
  deleteAuthToken,
} from 'redux/modules/auth';
import { asyncConnect } from 'redux-async-connect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Header, ReactLoader } from 'containers';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const styles = {
  app: {
    flex: 0.5,
  },
};

@asyncConnect([{
  promise: ({store: {}}) => {
    const promises = [];
    return Promise.all(promises);
  },
}])
@connect(
  state => ({ token: state.auth.token }),
  { deleteAuthToken, storeAuthToken }
)
export default class App extends Component {

  static propTypes = {
    token: PropTypes.string,
    children: PropTypes.object,
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.token && nextProps.token) {
      storeAuthToken(nextProps.token);
    }

    if (this.props.token && !nextProps.token) {
      deleteAuthToken();
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={ styles.app }>
          <ReactLoader />
          <Header />
          { this.props.children }
        </div>
      </MuiThemeProvider>
    );
  }
}

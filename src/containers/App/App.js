import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  storeAuthToken,
  deleteAuthToken,
  loadToken,
  isLoaded,
} from 'redux/modules/auth';
import { asyncConnect } from 'redux-async-connect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Header, ReactLoader, SnackBar } from 'containers';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const styles = {
  app: {
    flex: 1,
    padding: '0 20px',
  },
};

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isLoaded(getState())) {
      promises.push(dispatch(loadToken()));
    }
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
    const containerStyle = {
      marginTop: '70px',
      maxWidth: '1900px',
      display: 'flex',
      justifyContent: 'center',
    };
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={ styles.app }>
          <ReactLoader />
          <Header />
          <div style={containerStyle}>
            { this.props.children }
          </div>
          <SnackBar />
        </div>
      </MuiThemeProvider>
    );
  }
}

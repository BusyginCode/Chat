import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { getFriends, isLoadedFriends } from 'redux/modules/friends';
import * as ChatReduser from 'redux/modules/chat';
import Helmet from 'react-helmet';
import InsetList from './InsetList';
// import MenuBar from './components/MenuBar';
import Chat from './components/Chat';
import io from 'socket.io-client';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isLoadedFriends(getState())) {
      promises.push(dispatch(getFriends(getState().auth.user.friends)));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    choosenMenuInset: state.chat.choosenMenuInset,
    user: state.auth.user,
  }),
  { ...ChatReduser }
)
export default class ChatMain extends Component {

  static propTypes = {
    user: PropTypes.object,
    changeMenuInset: PropTypes.func.isRequired,
    choosenMenuInset: PropTypes.string.isRequired,
  }

  constructor() {
    super();
    this.socket = io('http://localhost:8001');
  }

  componentDidMount() {
    this.socket.on('message', (text) => console.log(text)); // eslint-disable-line
  }

  render() {
    const styles = require('./styles.js');

    return (
      <div style={styles.chatContainer}>
        <Helmet title="Chat"/>
        {
          // <div style={styles.menuBar}>
          //   <MenuBar
          //     handleChangeMenuInset={this.props.changeMenuInset}
          //     choosenInset={this.props.choosenMenuInset}
          //   />
          // </div>
        }
        <div style={styles.menuContainer}>
          <InsetList />
        </div>
        <div style={styles.chat}>
          <Chat />
        </div>
      </div>
    );
  }
}

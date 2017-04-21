import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { getFriends, isLoadedFriends } from 'redux/modules/friends';
import * as ChatReduser from 'redux/modules/chat';
import * as FriendReduser from 'redux/modules/friends';
import * as AuthReduser from 'redux/modules/auth';
import Helmet from 'react-helmet';
import InsetList from './InsetList';
import MenuBar from './components/MenuBar';
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
  { ...ChatReduser, ...FriendReduser, ...AuthReduser }
)
export default class ChatMain extends Component {

  static propTypes = {
    getUser: PropTypes.func,
    user: PropTypes.object,
    // handleMutation: PropTypes.func.isRequired,
    changeMenuInset: PropTypes.func.isRequired,
    choosenMenuInset: PropTypes.string.isRequired,
    getFriends: PropTypes.func,
  }

  constructor() {
    super();
    this.socket = io('http://localhost:8001');
  }

  componentDidMount() {
    this.socket.on('message', (text) => console.log(text)); // eslint-disable-line
  }

  handleSend = () => {
    this.props.getUser("58f9c7b97b7bb841aa98b5a3");
  }

  handleSendMutation = () => {
    this.props.getFriends(this.props.user.friends);
  }

  render() {
    const styles = require('./styles.js');

    return (
      <div style={styles.chatContainer}>
        <Helmet title="Chat"/>
        <div style={styles.menuBar}>
          <MenuBar
            handleChangeMenuInset={this.props.changeMenuInset}
            choosenInset={this.props.choosenMenuInset}
          />
        </div>
        <div style={styles.menuContainer}>
          <InsetList />
        </div>
        <div style={styles.chat}>
          <button onClick={this.handleSend}>
            Graph
          </button>
          <button onClick={this.handleSendMutation}>
            Mutation
          </button>
          <Chat />
        </div>
      </div>
    );
  }
}

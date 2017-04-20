import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { handleGetFriends, isLoadedFriends } from 'redux/modules/friends';
import * as ChatReduser from 'redux/modules/chat';
import Helmet from 'react-helmet';
import InsetList from './InsetList';
import MenuBar from './components/MenuBar';
import Chat from './components/Chat';
import io from 'socket.io-client';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isLoadedFriends(getState())) {
      promises.push(dispatch(handleGetFriends(getState().auth.user.friends)));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    choosenMenuInset: state.chat.choosenMenuInset,
  }),
  { ...ChatReduser }
)
export default class ChatMain extends Component {

  static propTypes = {
    handleGetUser: PropTypes.func,
    handleMutation: PropTypes.func.isRequired,
    handleChangeMenuInset: PropTypes.func.isRequired,
    choosenMenuInset: PropTypes.string.isRequired,
  }

  constructor() {
    super();
    this.socket = io('http://localhost:8001');
  }

  componentDidMount() {
    this.socket.on('message', (text) => console.log(text)); // eslint-disable-line
  }

  handleSend = () => {
    this.props.handleGetUser();
  }

  handleSendMutation = () => {
    this.props.handleMutation();
  }

  render() {
    const styles = require('./styles.js');

    return (
      <div style={styles.chatContainer}>
        <Helmet title="Chat"/>
        <div style={styles.menuBar}>
          <MenuBar
            handleChangeMenuInset={this.props.handleChangeMenuInset}
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

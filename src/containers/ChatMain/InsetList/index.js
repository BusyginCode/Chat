import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import * as ChatReduser from 'redux/modules/chat';
import * as AuthReduser from 'redux/modules/auth';
import * as FriendsReduser from 'redux/modules/friends';
import { openSnackBar } from 'redux/modules/snackbar';
import FriendInset from './components/FriendInset';
import ChatInset from './components/ChatInset';
import SearchPanel from './components/SearchPanel';
import FindFriendModal from './components/FindFriendModal';
const styles = require('./styles');

@connect(
  state => ({
    choosenMenuInset: state.chat.choosenMenuInset,
    user: state.auth.user,
    friends: state.friends.list,
  }),
  { ...ChatReduser, ...AuthReduser, ...FriendsReduser, openSnackBar }
)
export default class InsetList extends Component {

  static propTypes = {
    choosenMenuInset: PropTypes.string,
    user: PropTypes.object,
    friends: PropTypes.array,
    addFriend: PropTypes.func,
    findFriend: PropTypes.func,
    getFriend: PropTypes.func,
    removeFriend: PropTypes.func,
    setUser: PropTypes.func,
    setFriends: PropTypes.func,
    openSnackBar: PropTypes.func,
  }

  state = {
    searchText: '',
    findedFriend: undefined,
  }

  getInsets() {
    switch (this.props.choosenMenuInset) {
      case 'friends': return this.props.friends &&
        this.props.friends.map(friend =>
          <FriendInset
            key={Math.random()}
            onRemoveFriends={() => this.handleRemoveUserFriend(friend.id)} // eslint-disable-line
            {...friend}
          />
        );
      case 'chats': return [].map(chat => <ChatInset key={Math.random()} {...chat} />);
      default: return [];
    }
  }

  getEmptyMessage = () => {
    switch (this.props.choosenMenuInset) {
      case 'friends': return 'Your friends will be here';
      case 'chats': return 'Your chats will be here';
      default: return '';
    }
  }

  handleChangeSearchText = (event) => this.setState({ searchText: event.target.value });

  handleFindFriend = () => {
    return this.props.findFriend(this.state.searchText)
      .then((res) => {
        if (res.data.user) {
          this.setState({ searchText: '', findedFriend: res.data.user });
        } else {
          this.props.openSnackBar({ message: "User not found" });
        }
      })
      .catch((err) => console.error(err)) // eslint-disable-line
  }

  handleCloseFindFriendsModal = () =>
    this.setState({ findedFriend: undefined });

  handleRemoveUserFriend = (friendId) =>
    this.props.removeFriend(this.props.user.id, friendId)
      .then((res) => this.props.setUser(res.data.removeFriend.user))
      .catch((err) => console.error(err)); // eslint-disable-line

  handleAddUserFriend = (userId, friendId) =>
    this.props.addFriend(userId, friendId)
      .then((res) => this.props.setUser(res.data.addFriend.user))
      .catch((err) => console.error(err)); // eslint-disable-line

  render() {
    const insets = this.getInsets();
    return (
      <div style={styles.insetList}>
        {insets && !!insets.length &&
          <List>
            <Subheader>Friends</Subheader>
            {insets}
          </List>
        }
        {insets && !insets.length &&
          <div style={styles.emptyListMessage}>
            {this.getEmptyMessage()}
          </div>
        }
        <SearchPanel
          onSubmit={this.handleFindFriend}
          onSearchTextChange={this.handleChangeSearchText}
          searchText={this.state.searchText}
          choosenMenuInset={this.props.choosenMenuInset}
        />
        <FindFriendModal
          onClose={this.handleCloseFindFriendsModal}
          findedFriend={this.state.findedFriend}
          userFriends={this.props.user && this.props.user.friends}
          onAddFriend={this.handleAddUserFriend}
          userId={this.props.user && this.props.user.id}
        />
      </div>
    );
  }
}

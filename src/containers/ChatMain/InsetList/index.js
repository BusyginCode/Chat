import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ChatReduser from 'redux/modules/chat';
import * as AuthReduser from 'redux/modules/auth';
import * as FriendsReduser from 'redux/modules/friends';
import FriendInset from './components/FriendInset';
import ChatInset from './components/ChatInset';
import SearchPanel from './components/SearchPanel';
import FindFriendModal from './components/FindFriendModal';
const styles = require('./styles');

var chats = [ // eslint-disable-line
  {
    participants: ['Dima'],
    date: "28/10/1997",
    lastMessage: 'Message'
  },
  {
    participants: ['Dima'],
    date: "28/10/1997",
    lastMessage: 'Message'
  },
  {
    participants: ['Dima'],
    date: "28/10/1997",
    lastMessage: 'Message'
  },
  {
    participants: ['Dima'],
    date: "28/10/1997",
    lastMessage: 'Message'
  },
  {
    participants: ['Dima'],
    date: "28/10/1997",
    lastMessage: 'Message'
  },
];

@connect(
  state => ({
    choosenMenuInset: state.chat.choosenMenuInset,
    user: state.auth.user,
    friends: state.friends.list,
  }),
  { ...ChatReduser, ...AuthReduser, ...FriendsReduser }
)
export default class InsetList extends Component {

  static propTypes = {
    choosenMenuInset: PropTypes.string,
    user: PropTypes.object,
    friends: PropTypes.array,
    handleAddUserFriend: PropTypes.func,
    handleFindFriends: PropTypes.func,
    handleGetUser: PropTypes.func,
    handleGetFriends: PropTypes.func,
    handleGetFriend: PropTypes.func,
    handleRemoveFriend: PropTypes.func,
    handleSetUser: PropTypes.func,
  }

  state = {
    isSubmit: false,
    searchText: '',
    findedFriends: undefined,
    isFriendsModalOpen: false,
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
    case 'chats': return chats.map(chat => <ChatInset key={Math.random()} {...chat} />);
    default: return [];
    }
  }

  handleChangeSearchText = (event) => this.setState({ searchText: event.target.value });

  handleFindFriend = () => {
    this.setState({ isSubmit: true });
    this.props.handleFindFriends(this.state.searchText)
      .then((res) => {
        const users = res.data.findFriends.users || [];
        if (users.length) {
          this.setState({
            isFriendsModalOpen: true,
            searchText: '',
            findedFriends: users,
          });
        }
      })
      .catch((err) => console.error(err)) // eslint-disable-line
      .finally(() => this.setState({ isSubmit: false }));
  }

  handleCloseFindFriendsModal = () =>
    this.setState({
      isFriendsModalOpen: false,
      findedFriends: undefined,
    });

  handleRemoveUserFriend = (friendId) => {
    this.props.handleRemoveFriend(this.props.user.id, friendId)
      .then((res) => {
        console.log(res);
        // this.props.handleSetUser()
      });
  }

  handleAddUserFriend = (userId, friendId) =>
    this.props.handleAddUserFriend(userId, friendId)
      .then(() => this.props.handleGetUser(userId))
      .then(() => this.props.handleGetFriend(friendId))
      .catch((err) => console.error(err)); // eslint-disable-line

  render() {
    return (
      <div style={styles.insetList}>
        <div>{this.getInsets()}</div>
        <SearchPanel
          onSubmit={this.handleFindFriend}
          onSearchTextChange={this.handleChangeSearchText}
          searchText={this.state.searchText}
          isSubmit={this.state.isSubmit}
          choosenMenuInset={this.props.choosenMenuInset}
        />
        <FindFriendModal
          onClose={this.handleCloseFindFriendsModal}
          findedFriends={this.state.findedFriends}
          userFriends={this.props.user && this.props.user.friends}
          onAddFriend={this.handleAddUserFriend}
          userId={this.props.user && this.props.user.id}
        />
      </div>
    );
  }
}

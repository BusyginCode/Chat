import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ChatReduser from 'redux/modules/chat';
import * as AuthReduser from 'redux/modules/auth';
import FriendInset from './FriendInset';
import ChatInset from './ChatInset';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Spinner from '../../../components/Spinner';

var friends = [ // eslint-disable-line
  {
    login: 'Dima',
    logo: 'logo',
  },
  {
    login: 'Dima',
    logo: 'logo',
  },
  {
    login: 'Dima',
    logo: 'logo',
  },
  {
    login: 'Dima',
    logo: 'logo',
  },
  {
    login: 'Dima',
    logo: 'logo',
  },
];

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
  }),
  { ...ChatReduser, ...AuthReduser }
)
export default class InsetList extends Component {

  static propTypes = {
    choosenMenuInset: PropTypes.string,
    user: PropTypes.object,
    handleAddUserFriend: PropTypes.func,
    handleFindFriends: PropTypes.func,
    handleGetUser: PropTypes.func,
  }

  state = {
    isSubmit: false,
    searchText: '',
    findedPeople: undefined,
    isFriendsModalOpen: false,
  }

  getInsets() {
    switch (this.props.choosenMenuInset) {
    case 'friends': return friends.map(friend => <FriendInset key={Math.random()} {...friend} />);
    case 'chats': return chats.map(chat => <ChatInset key={Math.random()} {...chat} />);
    default: return [];
    }
  }

  handleChangeSearchText = (event) => {
    console.log(event, event.keyCode);
    this.setState({ searchText: event.target.value });
  }

  handleSubmit = () => {
    this.setState({ isSubmit: true });
    this.props.handleFindFriends(this.state.searchText)
      .then((res) => {
        console.log('RES ', res);
        const users = res.data.findFriends.users || [];
        if (users.length) {
          this.setState({
            isFriendsModalOpen: true,
            searchText: '',
            findedPeople: users,
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => this.setState({ isSubmit: false }));
  }

  handleCloseFindFriendsModal = () => {
    this.setState({
      isFriendsModalOpen: false,
      findedPeople: undefined,
    });
  }

  handleAddUserFriend = (userId, friendId) => {
    this.props.handleAddUserFriend(userId, friendId)
      .then(() => this.props.handleGetUser(userId))
      .catch((err) => console.error(err));
  }

  render() {
    const styles = require('./styles');

    return (
      <div style={styles.insetList}>
        <div>
          {this.getInsets()}
        </div>
        {this.props.choosenMenuInset === 'friends' &&
          <div style={styles.searchPanel}>
            {!this.state.isSubmit ?
              <div style={{ textAlign: 'center' }}>
                <TextField
                  style={{width: '100%'}}
                  inputStyle={{color: 'white'}}
                  value={this.state.searchText}
                  floatingLabelText="Find friends"
                  hintText = "Search"
                  onChange={this.handleChangeSearchText}
                />
                <RaisedButton
                  style={{width: '50%'}}
                  label="Search"
                  onClick={this.handleSubmit}
                />
              </div>
            : <Spinner />
            }
          </div>
        }
        <Dialog
          title="Finded users:"
          modal={false}
          open={Boolean(this.state.findedPeople)}
          onRequestClose={this.handleCloseFindFriendsModal}
          contentStyle={{maxHeight: '500px', minHeight: '500px', overflowY: 'auto'}}
        >
          <List>
            {this.state.findedPeople && this.state.findedPeople.map(man =>
              <div key={Math.random()}>
                <ListItem
                  primaryText={man.login}
                  rightIcon={!this.props.user.friends.includes(man.id) ?
                    <RaisedButton
                      label="Add"
                      primary
                      onClick={() => this.handleAddUserFriend(this.props.user.id, man.id)} // eslint-disable-line
                    />
                    : <div>Added</div>
                  }
                />
                <Divider />
              </div>
            )}
          </List>
        </Dialog>
      </div>
    );
  }
}

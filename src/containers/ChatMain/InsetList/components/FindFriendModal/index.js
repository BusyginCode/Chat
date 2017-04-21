import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
const styles = require('./styles');

export default class FindFriendModal extends Component {

  static propTypes = {
    onAddFriend: PropTypes.func,
    onClose: PropTypes.func,
    findedFriend: PropTypes.object,
    userFriends: PropTypes.array,
    userId: PropTypes.string,
  }

  handleAddFriend = () => {
    const { findedFriend, userId } = this.props;
    this.props.onAddFriend(userId, findedFriend.id);
    this.props.onClose();
  }

  get actions() {
    return [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.props.onClose}
      />
    ];
  }

  get rightIcon() {
    const { findedFriend, userFriends, userId } = this.props;
    if (!userFriends.includes(findedFriend.id) && findedFriend.id !== userId) {
      return (
        <RaisedButton
          label="Add"
          style={styles.addButton}
          primary
          onClick={this.handleAddFriend}
        />
      );
    }
    return (
      <div style={styles.addedFriendMessage}>
        {findedFriend.id !== userId ? 'Added' : "It's you!"}
      </div>
    );
  }

  render() {
    const {
      onClose,
      findedFriend,
    } = this.props;

    return (
      <Dialog
        title="Found user:"
        modal={false}
        open={Boolean(findedFriend)}
        onRequestClose={onClose}
        contentStyle={styles.dialogContentStyle}
        bodyStyle={styles.dialogBodyStyle}
        actions={this.actions}
      >
        {findedFriend &&
          <div>
            <ListItem
              primaryText={findedFriend.login}
              rightIcon={this.rightIcon}
            />
            <Divider />
          </div>
        }
      </Dialog>
    );
  }
}

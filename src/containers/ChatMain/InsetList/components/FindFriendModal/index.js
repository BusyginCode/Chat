import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
const styles = require('./styles');

export default class FindFriendModal extends Component {

  static propTypes = {
    onAddFriend: PropTypes.func,
    onClose: PropTypes.func,
    findedFriends: PropTypes.array,
    userFriends: PropTypes.array,
    userId: PropTypes.string,
  }

  handleClose = (userId, friendId) => {
    this.props.onAddFriend(userId, friendId);
    this.props.onClose();
  }

  render() {
    const {
      onClose,
      findedFriends,
      userFriends,
      userId
    } = this.props;
    return (
      <Dialog
        title="Finded users:"
        modal={false}
        open={Boolean(findedFriends)}
        onRequestClose={onClose}
        contentStyle={styles.dialogContentStyle}
      >
        <List>
          {findedFriends && findedFriends.map(man =>
            <div key={Math.random()}>
              <ListItem
                primaryText={man.login}
                rightIcon={!userFriends.includes(man.id) ?
                  <RaisedButton
                    label="Add"
                    primary
                    onClick={() => this.handleClose(userId, man.id)} // eslint-disable-line
                  />
                  : <div>Added</div>
                }
              />
              <Divider />
            </div>
          )}
        </List>
      </Dialog>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import './friend-inset.scss';
// const styles = require('./styles');
const logo = require("./img/ok-128.jpg");

const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

export default class FriendInset extends Component {

  static propTypes = {
    login: PropTypes.string.isRequired,
    logo: PropTypes.string,
    onRemoveFriends: PropTypes.func,
  }

  getFriendMenu = () =>
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem onClick={this.props.onRemoveFriends}>
        Remove
      </MenuItem>
    </IconMenu>

  render() {
    const { login } = this.props;
    return (
      <div>
        <ListItem
          leftAvatar={<Avatar src={logo} />}
          rightIconButton={this.getFriendMenu()}
          primaryText={login}
        />
        <Divider />
      </div>
    );
  }
}

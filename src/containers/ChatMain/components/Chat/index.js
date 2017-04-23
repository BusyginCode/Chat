import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
const styles = require('./styles');
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

export default class Chat extends Component {

  state = {
    text: '',
  }

  handleTextAreaChange = (event) => {this.setState({ text: event.target.value });};

  handleMessageSubmit = () => {};

  render() {
    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <div style={styles.chat}>
        <List>
          <Subheader>Today</Subheader>
          <ListItem
            leftAvatar={<Avatar src={logo} />}
            rightIconButton={rightIconMenu}
            primaryText="Brendan Lim"
            secondaryText={
              <span style={styles.message}>Brunch this weekend?</span>
            }
          />
          <Divider />
        </List>
        <div style={styles.actionsContainer}>
          <TextField
            id="chat_message"
            value={this.state.text}
            hintText="Write a message..."
            multiLine
            style={styles.messageTextArea}
            onChange={this.handleTextAreaChange}
          />
          <RaisedButton
            label="Send"
            primary
            style={styles.sendButton}
            onClick={this.handleMessageSubmit}
          />
        </div>
      </div>
    );
  }
}

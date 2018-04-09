import React from 'react';

import io from 'socket.io-client';

import MessageList from './messages/MessageList.jsx';
import MessageForm from './messages/MessageForm.jsx';
import UserList from './users/UserList.jsx';
import UserForm from './users/UserForm.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      status: 'disconnected',
      messages: [{
        timeStamp: Date.now(),
        text: 'Welcome to SockChat'
      }],
      users: [],
      user: ''
    };
  }

  componentWillMount () {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect.bind(this));
    this.socket.on('disconnect', this.disconnect.bind(this));
    this.socket.on('messageAdded', this.onMessageAdded.bind(this));
    this.socket.on('userJoined', this.onUserJoined.bind(this));
  }

  connect () {
    this.setState({status: 'connected'});
    console.log('Connected: ' + this.socket.id);
  }

  disconnect (users) {
    this.setState({
      status: 'disconnected',
      users: users
    });
  }

  emit (eventName, payload) {
    this.socket.emit(eventName, payload);
  }

  onMessageAdded (message) {
    this.setState({
      messages: this.state.messages.concat(message)
    });
  }

  setUser (user) {
    this.setState({ user: user });
  }

  onUserJoined (users) {
    this.setState({ users: users });
  }

  render () {
    console.log(this.state.messages);

    if (!this.state.user) {
      return (
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <UserForm emit={ this.emit.bind(this) } setUser={ this.setUser.bind(this) } />
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-md-4">
            <UserList { ...this.state } />
          </div>
          <div className="col-md-8">
            <MessageList { ...this.state } />
            <MessageForm { ...this.state } emit={ this.emit.bind(this) } />
          </div>
        </div>
      );
    }
  }
}

export default App;
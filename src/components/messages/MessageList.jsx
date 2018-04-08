import React from 'react';

import Message from './Message.jsx';

class MessageList extends React.Component {
  render () {
    return (
      <div className="well">
        <h1>Messages</h1>
        {
          this.props.messages.map((message, index) => {
            return <Message message={ message } key={ index } />
          })
        }
      </div>
    );
  }
}

export default MessageList;
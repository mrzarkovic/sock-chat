import React from 'react';
import moment from 'moment';

class Message extends React.Component {
  render () {
    const {message} = this.props;
    const formatedTime = moment(message.timeStamp).format(moment.HTML5_FMT.TIME_SECONDS);

    return (
      <div className="message">
        <strong>{ formatedTime }</strong> - { message.text }
      </div>
    );
  }
}

export default Message;
import React from 'react';

class MessageForm extends React.Component {
  render () {
    return (
      <div className="row">
        <form onSubmit={ this.onSubmit.bind(this) }>
          <input type="text" className="form-control" ref="text" placeholder="Please place message..." />
        </form>
      </div>
    );
  }

  onSubmit (e) {
    e.preventDefault();

    this.props.emit('addMessage', {
      timestamp: Date.now(),
      text: this.refs.text.value.trim()
    });

    this.refs.text.value = '';
  }
}

export default MessageForm;
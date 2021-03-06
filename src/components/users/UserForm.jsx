import React from 'react';

class UserForm extends React.Component {
  render () {
    return (
      <div>
        <h3>Chat Login</h3>
        <form onSubmit={ this.onSubmit.bind(this) }>
          <input type="text" className="form-control" ref="name" placeholder="Choose a Username" />
        </form>
      </div>
    );
  }

  onSubmit (e) {
    e.preventDefault();

    let name = this.refs.name.value.trim();

    this.props.setUser({ name: name });
    this.props.emit('userJoin', { name: name });

    this.refs.name.value = '';
  }
}

export default UserForm;
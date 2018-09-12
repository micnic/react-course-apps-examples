import React, { Component } from 'react';

export default class  NoteItem extends Component {

  NoteUpdate = () => {

    this.props.onUpdate(this.props);
  };

  render() {

    return (
      <React.Fragment>
        <div>
          <h3>{this.props.title}</h3>
          <p>{this.props.body}</p>
          <p>{this.props.date}</p>
          <div>
            <button onClick={this.NoteUpdate}>Edit</button>
            <button>Cancel</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

import React from 'react';

export default class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      title: '',
      body: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      index: nextProps.index ? nextProps.index : '',
      title: nextProps.title ? nextProps.title : '',
      body: nextProps.body ? nextProps.body : '',
    })
  }


  updateValueTitle = (e) => {

    this.setState({
      title: e.target.value
    })
  };

  updateValueBody = (e) => {

    this.setState({
      body: e.target.value
    })
  };

  saveNote = () => {
    let note = this.state;

    note.date = new Date().toString();
    this.props.onSave(this.state);
  };

  render() {

    const note = this.state;

    return (
      <div className="note--form">
        <h1>New Note</h1>

          <div className="note-label">
            <input type="text" name="title" value={note.title} onChange={this.updateValueTitle}/>
          </div>

          <div className="note--body">
            <textarea name="body" value={note.body} onChange={this.updateValueBody} />
          </div>

          <div className="note--actions">
            <button className="by=tn btn--save" onClick={this.saveNote}>Save</button>
            <button className="by=tn btn--delete">Cancel</button>
          </div>
      </div>
    )
  }
}